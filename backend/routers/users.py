from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.dependencies.auth import get_db
from backend.schemas import UserCreate, UserResponse, UserUpdate
from backend.models.user import User
from backend.services.user_service import (create_new_user, list_all_users, get_user_by_id, delete_user, update_user_password, update_user_role)
from backend.dependencies.auth import require_role

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        if not user.username or not user.password:
            raise ValueError("Usuário e senha são obrigatórios.")
        new_user = create_new_user(user.username, user.password, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return new_user

@router.get("/", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    return list_all_users(db)

@router.get("/me", response_model=UserResponse)
def get_current_user(db: Session = Depends(get_db), current_user: User = Depends(require_role("user"))):
    return current_user
    
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    user = get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.delete("/{user_id}", response_model=UserResponse)
def remove_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    try:
        user = delete_user(user_id, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return user

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    try:
        if user.password:
            updated_user = update_user_password(user_id, user, db)
        elif user.role:
            updated_user = update_user_role(user_id, user, db)
        else:
            raise HTTPException(status_code=400, detail="Nenhum campo para atualizar")
        return updated_user
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

