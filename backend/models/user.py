from sqlalchemy import Column, Integer, String
from . import Base
import secrets
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    id = Column(String(64), primary_key=True, default=lambda: secrets.token_urlsafe(32), unique=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="pending")

    def verify_password(self, plain_password: str) -> bool:
        return pwd_context.verify(plain_password, self.password_hash)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

