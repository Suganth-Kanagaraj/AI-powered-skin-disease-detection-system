from datetime import timedelta
from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.auth_schema import UserCreate


ACCESS_EXPIRE_MINUTES = 20
REFRESH_EXPIRE_DAYS = 7


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_in: UserCreate) -> User:
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        name=user_in.name,
        role='patient',
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_tokens_for_user(user: User):
    access_token = create_access_token({"sub": str(user.id)}, expires_delta=timedelta(minutes=ACCESS_EXPIRE_MINUTES))
    refresh_token = create_access_token({"sub": str(user.id)}, expires_delta=timedelta(days=REFRESH_EXPIRE_DAYS))
    return access_token, refresh_token
