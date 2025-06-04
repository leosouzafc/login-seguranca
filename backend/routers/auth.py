from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.user import User
from backend.schemas import UserCreate, UserResponse, TokenResponse
from backend.services.user_service import create_new_user
from backend.core.security import create_access_token
from backend.dependencies.auth import get_current_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_new_user(user.username, user.password, db)

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha inválidos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username})
    
    response = Response(content="Login successful")
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,  
        secure=False,  #only false for local development
        samesite="lax",
        max_age=3600
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,           
        "username": user.username    
    }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="token",
        httponly=True,
        secure=True,
        samesite="lax",
        path="/"
    )
    return {"message": "Logout successful"}

@router.get("/check")
def check_auth(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username, "role": current_user.role}
