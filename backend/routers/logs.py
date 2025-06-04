from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user import User
from backend.dependencies.auth import require_role
from backend.services.log_service import (
    get_all_login_attempts,
    get_recent_login_attempts,
    get_failed_login_attempts,
    get_user_login_attempts
)
from backend.schemas import LoginAttemptResponse
from typing import List

router = APIRouter()

@router.get("/all", response_model=List[LoginAttemptResponse])
def get_logs(
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin"))
):
    """Retorna todos os logs de tentativas de login"""
    return get_all_login_attempts(db, limit)

@router.get("/recent", response_model=List[LoginAttemptResponse])
def get_recent_logs(
    hours: int = 24,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin"))
):
    """Retorna os logs de tentativas de login das últimas X horas"""
    return get_recent_login_attempts(db, hours)

@router.get("/failed", response_model=List[LoginAttemptResponse])
def get_failed_logs(
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin"))
):
    """Retorna apenas as tentativas de login que falharam"""
    return get_failed_login_attempts(db, limit)

@router.get("/user/{username}", response_model=List[LoginAttemptResponse])
def get_user_logs(
    username: str,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin"))
):
    """Retorna os logs de tentativas de login de um usuário específico"""
    return get_user_login_attempts(db, username, limit) 