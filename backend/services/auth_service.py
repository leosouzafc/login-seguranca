from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.models.user import User
from backend.models.login_attempt import LoginAttempt
from backend.core.security import verify_password, create_access_token
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    login_attempt = LoginAttempt(username=username, success=False)
    if not user or not verify_password(password, user.password_hash):
        db.add(login_attempt)
        db.commit()
        return None
    
    login_attempt.success = True
    db.add(login_attempt)
    db.commit()

    return user

def create_auth_token(user: User):
    return create_access_token({"sub": user.username})