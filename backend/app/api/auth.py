from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth_schema import UserCreate, LoginIn, Token, UserOut
from app.services.auth_service import create_user, authenticate_user, create_tokens_for_user, get_user_by_email
from app.core.security import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post('/register', response_model=Token)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    user = create_user(db, payload)
    access, refresh = create_tokens_for_user(user)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


@router.post('/login', response_model=Token)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    access, refresh = create_tokens_for_user(user)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


@router.post('/refresh', response_model=Token)
def refresh(token: dict, db: Session = Depends(get_db)):
    # token: {"refresh_token":"..."}
    refresh_token = token.get('refresh_token')
    if not refresh_token:
        raise HTTPException(status_code=400, detail='refresh_token required')
    # verify and decode handled in security.get_current_user if used; here reuse jwt decode
    from jose import jwt, JWTError
    from app.core.security import SECRET_KEY, ALGORITHM
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get('sub'))
    except JWTError:
        raise HTTPException(status_code=401, detail='Invalid refresh token')

    user = db.query('users') if False else None
    # get user by id
    from app.models.user import User
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    access, refresh = create_tokens_for_user(user)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


@router.get('/me', response_model=UserOut)
def me(user = Depends(get_current_user)):
    return user
