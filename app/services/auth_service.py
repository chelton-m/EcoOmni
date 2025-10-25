from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.core.security import verify_password, create_access_token
from datetime import timedelta


def authenticate_user(db: Session, username: str, password: str) -> User:
    """
    Authenticate a user with username and password.
    
    Args:
        db: Database session
        username: Username to authenticate
        password: Plain text password
    
    Returns:
        User object if authentication successful
    
    Raises:
        HTTPException: If authentication fails
    """
    # BE-2: Retrieve user from database based on username
    user = db.query(User).filter(User.username == username).first()
    
    if not user:
        # AC-2: Invalid username or non-existent user
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # BE-3: Verify password using secure hashing
    if not verify_password(password, user.hashed_password):
        # AC-3: Valid username but incorrect password
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated"
        )
    
    return user


def create_user_session(user: User) -> dict:
    """
    Create a session for authenticated user.
    
    Args:
        user: Authenticated user object
    
    Returns:
        Dictionary containing session information
    """
    # BE-4: Create JWT token with user information
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "username": user.username,
            "role": user.role.value
        },
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.username,
        "role": user.role.value
    }
