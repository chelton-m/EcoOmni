from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.auth import LoginRequest, LoginResponse, ErrorResponse
from app.services.auth_service import authenticate_user, create_user_session
from app.models.user import User

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post(
    "/login",
    response_model=LoginResponse,
    responses={
        200: {"description": "Login successful", "model": LoginResponse},
        401: {"description": "Invalid credentials", "model": ErrorResponse},
        422: {"description": "Validation error", "model": ErrorResponse}
    }
)
async def login(
    login_request: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    User login endpoint.
    
    This endpoint implements the core authentication logic:
    - Validates user credentials against the database
    - Creates a secure session token (JWT)
    - Returns user role information
    
    Args:
        login_request: Login credentials (username and password)
        db: Database session dependency
    
    Returns:
        LoginResponse: Contains access token and user information
    
    Raises:
        HTTPException: 401 for invalid credentials, 422 for validation errors
    """
    try:
        # Authenticate user credentials
        user = authenticate_user(db, login_request.username, login_request.password)
        
        # Create user session
        session_data = create_user_session(user)
        
        # AC-1: Return 200 OK with secure session token and user role
        return LoginResponse(**session_data)
        
    except HTTPException:
        # Re-raise HTTP exceptions (401 Unauthorized)
        raise
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login"
        )
