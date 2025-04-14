from fastapi import APIRouter, Depends, HTTPException, status, Response
from backend.database import get_db
from sqlalchemy.orm import Session
from backend.schemas import LoginRequest
from backend.services.auth_service import authenticate_user,create_auth_token

router = APIRouter()

@router.post("/login")
def login(request: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = authenticate_user(request.username, request.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
    try:
        token = create_auth_token(user)
        response.set_cookie(key="token", value=token, httponly=True, samesite="strict", secure=True, max_age=3600) 
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao gerar token")
    return {"message": "Login bem-sucedido!"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("token")
    return {"message": "Logout bem-sucedido!"}
