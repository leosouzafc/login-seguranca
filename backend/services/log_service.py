from sqlalchemy.orm import Session
from backend.models.login_attempt import LoginAttempt
from datetime import datetime, timedelta

def get_all_login_attempts(db: Session, limit: int = 100):
    return db.query(LoginAttempt).order_by(LoginAttempt.timestamp.desc()).limit(limit).all()

def get_recent_login_attempts(db: Session, hours: int = 24):
    cutoff_time = datetime.now() - timedelta(hours=hours)
    return db.query(LoginAttempt).filter(
        LoginAttempt.timestamp >= cutoff_time
    ).order_by(LoginAttempt.timestamp.desc()).all()

def get_failed_login_attempts(db: Session, limit: int = 100):
    return db.query(LoginAttempt).filter(
        LoginAttempt.success == False
    ).order_by(LoginAttempt.timestamp.desc()).limit(limit).all()

def get_user_login_attempts(db: Session, username: str, limit: int = 100):
    return db.query(LoginAttempt).filter(
        LoginAttempt.username == username
    ).order_by(LoginAttempt.timestamp.desc()).limit(limit).all() 