from pydantic import BaseModel, EmailStr
from typing import Optional


class LoginRequest(BaseModel):
    """Request schema for user login"""
    username: str
    password: str


class LoginResponse(BaseModel):
    """Response schema for successful login"""
    access_token: str
    token_type: str = "bearer"
    user_id: int
    username: str
    role: str


class ErrorResponse(BaseModel):
    """Response schema for error cases"""
    detail: str
