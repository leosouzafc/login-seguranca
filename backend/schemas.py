from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional
from fastapi import HTTPException

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    role: Optional[str] = Field(default="pending")

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    def validate_password(cls, value):
        if not any(char.isdigit() for char in value):
            raise HTTPException(status_code=400, detail="A senha deve conter pelo menos um número.")

        if not any(char.isupper() for char in value):
            raise HTTPException(status_code=400, detail='A senha deve conter pelo menos uma letra maiúscula')
        if not any(char in '!@#$%^&*()-_=+[]{}|;:,.<>?/' for char in value):
            raise HTTPException(status_code=400, detail='A senha deve conter pelo menos 1 caractére especial')
        if not len(value) > 7 and len(value) < 101:
            raise HTTPException(status_code=400, detail='A senha deve ter entre 8 e 100 caracteres.')
        return value

class UserResponse(UserBase):
    id: int

    class ConfigDict:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginAttemptResponse(BaseModel):
    username: str
    success: bool
    timestamp: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str