from backend.database import SessionLocal
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user import User
from backend.core.security import decode_access_token
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

from fastapi import Request

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido ou expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exception

    payload = decode_access_token(token)
    if payload is None or "sub" not in payload:
        raise credentials_exception

    user = db.query(User).filter(User.username == payload["sub"]).first()
    if user is None:
        raise credentials_exception

    return user

def require_role(required_role: str):
    def role_dependency(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acesso negado"
            )
        return current_user
    return role_dependency