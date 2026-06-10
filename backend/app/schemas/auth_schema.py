from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class UserOut(BaseModel):
    id: int
    email: str
    name: Optional[str] = None
    role: str
    is_active: bool
    is_admin: bool

    model_config = ConfigDict(from_attributes=True)


class LoginIn(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"


class TokenData(BaseModel):
    sub: Optional[str] = None
