from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# URL для подключения к базе данных
SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://postgres:0000@localhost:5432/UgostyDb"

# Создание асинхронного двигателя
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Создание асинхронной сессии
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
