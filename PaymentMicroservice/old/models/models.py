from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import pytz
from datetime import datetime

def current_time_utc():
    return datetime.now(pytz.timezone('Europe/Moscow')).astimezone(pytz.utc).replace(tzinfo=None)


class Buns(Base):
    __tablename__ = 'accounts_buns'  # Название таблицы в базе данных

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    img_buns = Column(String, nullable=True)
    price = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    donation_buns = relationship('DonationBun', back_populates='bun')

    def __repr__(self):
        return f"<Buns(name={self.name}, price={self.price})>"
class DonationProfile(Base):
    __tablename__ = 'donation_profiles'
    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(120), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    image = Column(Text, nullable=True)


    payments = relationship('Payment', back_populates='donation_profile')

    donation_buns = relationship('DonationBun', back_populates='donation_profile')

    def __repr__(self):
        return self.nickname

class DonationBun(Base):
    __tablename__ = 'donation_buns'
    id = Column(Integer, primary_key=True, autoincrement=True)
    donation_profile_id = Column(Integer, ForeignKey('donation_profiles.id'), nullable=False)
    bun_id = Column(Integer, ForeignKey('accounts_buns.id'), nullable=False)
    quantity = Column(Integer, default=0, nullable=False)


    donation_profile = relationship('DonationProfile', back_populates='donation_buns')

    bun = relationship('Buns', back_populates='donation_buns')


    def __repr__(self):
        return f'{self.quantity} x {self.bun.name} для {self.donation_profile.nickname}'
class Payment(Base):
    __tablename__ = 'payments'
    id = Column(Integer, primary_key=True, index=True)
    donation_profile_id = Column(Integer, ForeignKey('donation_profiles.id'))
    payment_id = Column(String(50))
    status = Column(String(50))
    social_media = Column(String, nullable=False)
    donation_message = Column(Text, nullable=False)
    data = Column(Text, nullable=True)
    created_at = Column(DateTime, default=current_time_utc)
    payment_amount = Column(Integer, nullable=False)

    # Связь с профилем
    donation_profile = relationship('DonationProfile', back_populates='payments')

    def __repr__(self):
        return (f'Донат от {self.donator_email} '
                f'Автору {self.donation_profile.nickname} '
                f'Статус {self.status} '
                f'Дата создания {self.created_at}')