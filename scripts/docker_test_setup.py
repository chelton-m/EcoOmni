#!/usr/bin/env python3
"""
Docker test setup script.
This script creates test users and initializes the database for Docker testing.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
from app.models.user import User, UserRole
from app.core.security import get_password_hash
from app.db.database import Base

def setup_test_users():
    """Create test users for Docker testing."""
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Create test users for different roles
        test_users = [
            {
                "username": "testuser",
                "email": "test@ecoomni.com",
                "password": "testpass123",
                "role": UserRole.OPERATIONAL_MANAGER
            },
            {
                "username": "director",
                "email": "director@ecoomni.com", 
                "password": "director123",
                "role": UserRole.DIRECTOR
            },
            {
                "username": "admin",
                "email": "admin@ecoomni.com",
                "password": "admin123",
                "role": UserRole.SYSTEM_ADMIN
            }
        ]
        
        created_users = []
        
        for user_data in test_users:
            # Check if user already exists
            existing_user = db.query(User).filter(User.username == user_data["username"]).first()
            if existing_user:
                print(f"User '{user_data['username']}' already exists!")
                continue
            
            # Create new user
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=get_password_hash(user_data["password"]),
                role=user_data["role"],
                is_active=True
            )
            
            db.add(user)
            created_users.append(user_data)
        
        db.commit()
        
        print("Docker test setup completed!")
        print("\nTest users created:")
        for user_data in created_users:
            print(f"  - Username: {user_data['username']}")
            print(f"    Password: {user_data['password']}")
            print(f"    Role: {user_data['role']}")
            print(f"    Email: {user_data['email']}")
            print()
        
        print("You can now test the login endpoint with these credentials.")
        
    except Exception as e:
        print(f"Error setting up test users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    setup_test_users()
