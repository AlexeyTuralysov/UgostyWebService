from yookassa import Payment,Configuration
from Config import Config
from ModelsFields import PaymentRequest, PaymentResponse, SubscriptionType


Configuration.configure(Config.YOOKASSA_SHOP_ID, Config.YOOKASSA_SECRET_KEY)

class PaymentYookassa:
    def __init__(self):
        self.shop_id = Config.YOOKASSA_SHOP_ID
        self.secret_key = Config.YOOKASSA_SECRET_KEY

    def createPayment(self, payment_request: PaymentRequest)  -> PaymentResponse:

        payment_data = {
            "amount": {
                "value": 1,
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "https://merchant-site.ru/return_url"
            },
            "capture": True,
            "description": "Подписка",
            "receipt": {
                "customer": {
                    "full_name": payment_request.customer_name,
                    "email": payment_request.customer_email,
                    "phone": "79211234567",
                    "inn": "6321341814"
                },
                "items": [
                    {
                        "description": payment_request.subscription_type.value,
                        "quantity": "1.00",
                        "amount": {
                            "value": 1,
                            "currency": "RUB"
                        },
                        "vat_code": "2",
                        "payment_mode": "full_payment",
                        "payment_subject": "commodity",
                        "country_of_origin_code": "CN",
                        "product_code": "44 4D 01 00 21 FA 41 00 23 05 41 00 00 00 00 00 00 00 00 00 00 00 00 00 00 12 00 AB 00",
                        "customs_declaration_number": "10714040/140917/0090376",
                        "excise": "20.00",
                        "supplier": {
                            "name": "string",
                            "phone": "string",
                            "inn": "string"
                        }
                    }
                ]
            }
        }
        payment = Payment.create(payment_data)
        return PaymentResponse(
            id=payment.id,
            status=payment.status,
            amount=1,
            confirmation_url=payment.confirmation.confirmation_url
        )

