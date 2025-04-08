from sqlalchemy.orm import Session
from app.models import User
from app.security import hash_password

def create_new_user(username: str, password: str, db: Session):
    if db.query(User).filter(User.username == username).first():
        raise ValueError("Usuário já existe.")
    role = "admin" if db.query(User).count() == 0 else "user"
    hashed_password = hash_password(password)
    new_user = User(username=username, password_hash=hashed_password, role=role)
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

def update_user_password(user_id: int, username: str, password: str, db: Session, role: str):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    user.username = username
    user.password_hash = hash_password(password)

def update_user_role(user_id: int, db: Session, role: str):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    user.role = role

def delete_user(user_id: int, db: Session):
    user = get_user_by_id(user_id, db)
    if not user:
        raise ValueError("Usuário não encontrado.")
    db.delete(user)
    db.commit()
    return user