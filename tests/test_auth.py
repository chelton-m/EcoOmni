import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import tempfile
import os

from app.main import app
from app.db.database import get_db, Base
from app.models.user import User, UserRole
from app.core.security import get_password_hash

# Create a test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def test_user():
    """Create a test user for testing."""
    db = TestingSessionLocal()
    try:
        # Create test user
        user = User(
            username="testuser",
            email="test@ecoomni.com",
            hashed_password=get_password_hash("testpass123"),
            role=UserRole.OPERATIONAL_MANAGER,
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    finally:
        db.close()

@pytest.fixture
def inactive_user():
    """Create an inactive test user."""
    db = TestingSessionLocal()
    try:
        user = User(
            username="inactiveuser",
            email="inactive@ecoomni.com",
            hashed_password=get_password_hash("testpass123"),
            role=UserRole.OPERATIONAL_MANAGER,
            is_active=False
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    finally:
        db.close()

class TestLoginEndpoint:
    """Test cases for the login endpoint."""
    
    def test_successful_login(self, test_user):
        """Test successful login with valid credentials."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "testuser",
                "password": "testpass123"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # AC-1: Verify response contains required fields
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["user_id"] == test_user.id
        assert data["username"] == "testuser"
        assert data["role"] == "operational_manager"
        
        # Verify token is not empty
        assert len(data["access_token"]) > 0
    
    def test_invalid_username(self):
        """Test login with non-existent username."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "nonexistentuser",
                "password": "testpass123"
            }
        )
        
        # AC-2: Should return 401 Unauthorized
        assert response.status_code == 401
        data = response.json()
        assert data["detail"] == "Invalid username or password"
    
    def test_incorrect_password(self, test_user):
        """Test login with correct username but wrong password."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "testuser",
                "password": "wrongpassword"
            }
        )
        
        # AC-3: Should return 401 Unauthorized
        assert response.status_code == 401
        data = response.json()
        assert data["detail"] == "Invalid username or password"
    
    def test_inactive_user(self, inactive_user):
        """Test login with inactive user account."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "inactiveuser",
                "password": "testpass123"
            }
        )
        
        assert response.status_code == 401
        data = response.json()
        assert data["detail"] == "Account is deactivated"
    
    def test_missing_username(self):
        """Test login with missing username field."""
        response = client.post(
            "/api/auth/login",
            json={
                "password": "testpass123"
            }
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_missing_password(self):
        """Test login with missing password field."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "testuser"
            }
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_empty_credentials(self):
        """Test login with empty credentials."""
        response = client.post(
            "/api/auth/login",
            json={
                "username": "",
                "password": ""
            }
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_timing_attack_protection(self, test_user):
        """Test that timing attacks are mitigated."""
        import time
        
        # Test with non-existent user
        start_time = time.time()
        client.post(
            "/api/auth/login",
            json={
                "username": "nonexistentuser",
                "password": "testpass123"
            }
        )
        nonexistent_time = time.time() - start_time
        
        # Test with existing user but wrong password
        start_time = time.time()
        client.post(
            "/api/auth/login",
            json={
                "username": "testuser",
                "password": "wrongpassword"
            }
        )
        wrong_password_time = time.time() - start_time
        
        # The times should be similar (within 0.1 seconds) due to constant-time comparison
        # This is a basic test - in production, more sophisticated timing analysis would be needed
        time_difference = abs(nonexistent_time - wrong_password_time)
        assert time_difference < 0.1, "Potential timing attack vulnerability detected"
