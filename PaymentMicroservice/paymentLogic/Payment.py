from yookassa import Payment, Configuration
from models.schema import CreateNotePay

# Configure Yookassa with your credentials
Configuration.configure('294138', 'test_XVCde3rMzGOs_fF57TYC1elI-WJIWjUfob0u8YQ6Wqw')


class YookassaService:
    def __init__(self, payment_request):
        self.donation_message = payment_request.donation_message
        self.nickname = payment_request.nickname  # Use nickname instead of author ID
        self.social_media = payment_request.social_media
        self.donation_amount = payment_request.amount

    def create_payment(self):
        res = Payment.create(
            {
                "amount": {
                    "value": str(self.donation_amount),
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": f"http://localhost:3000/{self.nickname}"
                },
                "capture": True,
                "description": f"Donation from {self.nickname}",
                "receipt": {
                    "customer": {
                        "full_name": "Ivanov Ivan Ivanovich",  # Placeholder name
                        "email": "alexey@gmail.com",
                        "phone": "79211234567",  # Placeholder phone
                        "inn": "6321341814"  # Placeholder INN
                    },
                    "items": [
                        {
                            "description": "Donation",
                            "quantity": "1.00",
                            "amount": {
                                "value": str(self.donation_amount),
                                "currency": "RUB"
                            },
                            "vat_code": "2",
                            "payment_mode": "full_payment",
                            "payment_subject": "service",
                            "country_of_origin_code": "RU"
                        }
                    ]
                },
                "metadata": {
                    "nickname": self.nickname,
                    "email_donator": self.social_media,
                    "donation_amount": str(self.donation_amount),
                    "donation_message": str(self.donation_message)
                }
            }
        )
        confirmation_url = res.confirmation.confirmation_url if res.confirmation else None
        payment_id = res.id  # The payment ID

        return {
            "confirmation_url": confirmation_url,
            "payment_id": payment_id
        }
