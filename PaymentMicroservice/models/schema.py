from pydantic import BaseModel, Field
from typing import List

class DonationItem(BaseModel):
    bun_name: str
    quantity: int = Field(0, ge=0, description="Количество булочек")

class CreateDonation(BaseModel):
    nickname: str
    social_media: str
    donation_message: str

    items: List[DonationItem]

class PaymentResponse(BaseModel):
    confirmation_url: str
    payment_id: str

class CreateNotePay(BaseModel):
    nickname: str
    social_media: str
    donation_message: str
    amount: float
    description: str

