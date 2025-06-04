from sqlalchemy.orm import Session
from backend.models.user import User
from passlib.handlers.bcrypt import bcrypt

def create_new_user(username: str, password: str, db: Session):
    if db.query(User).filter(User.username == username).first():
        raise ValueError("Usuário já existe.")
    role = "admin" if db.query(User).count() == 0 else "user"
    new_user = User(
        username=username,
        password_hash=User.get_password_hash(password),
        role=role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def list_all_users(db: Session):
    return db.query(User).all()

def get_user_by_id(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("Usuário não encontrado.")
    return user

def update_user_password(user_id: int, user_data, db: Session):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    if user_data.password:
        user.password_hash = User.get_password_hash(user_data.password)
    db.commit()
    db.refresh(user)
    return user

def update_user_role(user_id: int, user_data, db: Session):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    if user_data.role:
        user.role = user_data.role
    db.commit()
    db.refresh(user)
    return user

def delete_user(user_id: int, db: Session):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    db.delete(user)
    db.commit()
    return user