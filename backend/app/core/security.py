from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .config import settings
from app.models import user as user_model
from app.models.token_blacklist import TokenBlacklist
from app.core.database import SessionLocal

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

SECRET_KEY = getattr(settings, 'secret_key', 'CHANGEME')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(getattr(settings, 'access_token_expire_minutes', 60))

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = int(payload.get("sub")) if payload.get("sub") else None
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    db = SessionLocal()
    
    # Check if token is blacklisted
    if db.query(TokenBlacklist).filter(TokenBlacklist.token == token).first():
        db.close()
        raise credentials_exception
    
    user = get_user(db, user_id)
    db.close()
    if user is None:
        raise credentials_exception
    return user

def require_admin(user = Depends(get_current_user)):
    if not getattr(user, 'is_admin', False) and getattr(user, 'role', '') != 'admin':
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user
