from fastapi import FastAPI, HTTPException, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import logging
import uvicorn
from models.database import get_db
from models.models import Payment, DonationProfile, Buns, DonationBun
from models.schema import CreateNotePay, PaymentResponse, CreateDonation
from paymentLogic.Payment import YookassaService
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:2000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройка логирования
logging.basicConfig(level=logging.INFO)


@app.post("/donate", response_model=PaymentResponse)
async def create_donation(donation_request: CreateDonation, db: AsyncSession = Depends(get_db)):
    try:
        # Найти профиль по нику
        result = await db.execute(select(DonationProfile).filter(DonationProfile.nickname == donation_request.nickname))
        profile = result.scalars().first()

        if not profile:
            raise HTTPException(status_code=404, detail="Профиль не найден")

        total_amount = 0
        for item in donation_request.items:
            # Найти булочку по имени
            bun_result = await db.execute(select(Buns).filter(Buns.name == item.bun_name))
            bun = bun_result.scalars().first()

            if not bun:
                raise HTTPException(status_code=404, detail=f"Плюшка '{item.bun_name}' не найдена")

            # Увеличить количество в промежуточной таблице DonationBun
            donation_bun = await db.execute(select(DonationBun).filter(
                DonationBun.donation_profile_id == profile.id,
                DonationBun.bun_id == bun.id
            ))
            existing_donation_bun = donation_bun.scalars().first()
            if existing_donation_bun:
                existing_donation_bun.quantity += item.quantity
            else:
                db.add(DonationBun(
                    donation_profile_id=profile.id,
                    bun_id=bun.id,
                    quantity=item.quantity
                ))

            # Рассчитать общую сумму для текущего элемента
            total_amount += item.quantity * bun.price

        if total_amount <= 0:
            raise HTTPException(status_code=400, detail="Сумма доната не может быть нулевой")

        # Создать платеж
        payment_request = CreateNotePay(
            nickname=donation_request.nickname,
            social_media=donation_request.social_media,
            donation_message=donation_request.donation_message,
            amount=total_amount,  # Передаем рассчитанную сумму
            description=f"Донат от {profile.nickname}: {', '.join([f'{item.quantity} {item.bun_name}' for item in donation_request.items])}"
        )

        # Убедитесь, что в YookassaService вы передаете корректный объект
        payment_service = YookassaService(payment_request)
        payment = payment_service.create_payment()  # Убедитесь, что здесь используется payment_request без amount

        if not payment:
            raise HTTPException(status_code=500, detail="Ошибка создания платежа")

        # Создание записи о платеже
        newPay = Payment(
            donation_profile_id=profile.id,
            payment_id=payment['payment_id'],
            status='pending',
            social_media=donation_request.social_media,
            donation_message=donation_request.donation_message,
            data=str(payment),
            payment_amount=total_amount,  # Используем рассчитанное значение
        )

        db.add(newPay)
        await db.commit()
        await db.refresh(newPay)

        return PaymentResponse(confirmation_url=payment['confirmation_url'], payment_id=payment['payment_id'])

    except Exception as e:
        logging.error(f"Ошибка в создании доната: {e}")
        raise HTTPException(status_code=400, detail=str(e))
@app.post("/webhook")
async def webhook(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        event = await request.json()
        logging.info(f"Получено уведомление: {event}")

        event_type = event.get('event')
        if event_type == 'payment.succeeded':
            payment_object = event.get('object', {})
            metadata = payment_object.get('metadata', {})
            nickname = metadata.get('nickname')
            payment_id = payment_object.get('id')

            # поиск профиля по нику
            profile = None
            if nickname:
                result = await db.execute(
                    select(DonationProfile).filter(DonationProfile.nickname == nickname)
                )
                profile = result.scalars().first()

            # сохранение
            new_payment = Payment(
                donation_profile_id=profile.id if profile else None,
                payment_id=payment_id,
                status='succeeded',
                data=str(payment_object)
            )
            db.add(new_payment)
            await db.commit()

            logging.info(f"Платеж успешно завершен. Payment ID: {payment_id}, Профиль: {profile.nickname if profile else 'Unknown'}")

        elif event_type == 'payment.waiting_for_capture':
            payment_object = event.get('object', {})
            logging.info(f"Платеж ожидает захвата: {payment_object}")

        elif event_type == 'payment.canceled':
            payment_object = event.get('object', {})
            logging.info(f"Платеж отменен: {payment_object}")

        else:
            logging.warning(f"неизвестный тип события: {event_type}")

        return {"status": "ok"}

    except Exception as e:
        logging.error(f"Ошибка в обработке вебхука: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=2000)