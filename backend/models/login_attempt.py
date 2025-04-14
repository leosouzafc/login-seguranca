from sqlalchemy import Column, Integer, String,Boolean,DateTime
import datetime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class LoginAttempt(Base):
    __tablename__ = "login_attempts"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    success = Column(Boolean, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.now())