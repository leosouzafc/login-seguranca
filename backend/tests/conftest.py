import pytest
from fastapi.testclient import TestClient
from backend.main import app 
from backend.database import Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from backend.models.user import User
from backend.core.security import hash_password

engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    Base.metadata.create_all(bind=engine)
    session = SessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def test_client():
    Base.metadata.create_all(bind=engine)
    yield TestClient(app) 
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def create_user(test_client):
    def _create_pending_user(username: str, password: str):
        response = test_client.post("/users/register", json={
            "username": username,
            "password": password,
        })
        return response
    return _create_pending_user

@pytest.fixture
def admin_token(test_client, create_user_db):
    create_user_db("admintest", "admin123", role="admin")
    response = test_client.post("/auth/login", json={
        "username": "admintest",
        "password": "admin123"
    })
    return response.json()["access_token"]

@pytest.fixture(scope="function")
def create_user_db(db_session):
    def _create_user(username: str, password: str, role: str = "user"):
        user = User(username=username, password_hash=hash_password(password), role=role)
        db_session.add(user)
        db_session.commit()
        return user
    return _create_user