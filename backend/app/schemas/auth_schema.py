from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str]


class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str]
    role: str
    is_active: bool
    is_admin: bool

    class Config:
        orm_mode = True


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str]
    token_type: str = "bearer"


class TokenData(BaseModel):
    sub: Optional[str] = None
