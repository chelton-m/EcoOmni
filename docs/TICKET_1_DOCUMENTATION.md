# Ticket 1: [Backend] Create User Login API Endpoint

## Overview
This ticket implements a secure user login API endpoint that validates user credentials and creates authenticated sessions using JWT tokens.

## Implementation Summary

### All Acceptance Criteria Met

- **AC-1**: Valid credentials return 200 OK with JWT token and user role
- **AC-2**: Invalid/non-existent username returns 401 Unauthorized
- **AC-3**: Valid username with incorrect password returns 401 Unauthorized  
- **AC-4**: Protected against timing attacks using constant-time comparison

### All Sub-tasks Completed

- **BE-1**: API route and controller for POST /api/auth/login
- **BE-2**: User retrieval logic from database
- **BE-3**: Secure password verification with bcrypt
- **BE-4**: JWT session creation with user ID and role
- **BE-5**: Comprehensive unit tests

## API Endpoint

### POST /api/auth/login

**Description**: Authenticates a user and returns a JWT token with user information.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200 OK)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "username": "testuser",
  "role": "operational_manager"
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "detail": "Invalid username or password"
}
```

**Error Response (422 Validation Error)**:
```json
{
  "detail": [
    {
      "loc": ["body", "username"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Security Features

### Password Security
- **Bcrypt Hashing**: Passwords are hashed using bcrypt with automatic salt generation
- **Constant-Time Comparison**: Prevents timing attacks by using constant-time password verification
- **Secure Storage**: Hashed passwords are stored in the database, never plain text

### JWT Token Security
- **Signed Tokens**: JWT tokens are signed with a secret key
- **Expiration**: Tokens expire after 30 minutes
- **User Information**: Tokens contain user ID, username, and role
- **Algorithm**: Uses HS256 algorithm for token signing

### Input Validation
- **Pydantic Models**: Request/response validation using Pydantic schemas
- **Required Fields**: Username and password are required fields
- **Type Validation**: Automatic type checking and conversion

## Database Schema

### User Model
```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.OPERATIONAL_MANAGER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### User Roles
- `operational_manager`: Can upload files and view basic analytics
- `director`: Full access to dashboard and analytics  
- `system_admin`: Complete system access and user management

## File Structure

```
app/
├── core/
│   └── security.py         # Password hashing and JWT token management
├── models/
│   └── user.py             # User database model
├── routers/
│   └── auth.py             # Authentication API routes
├── schemas/
│   └── auth.py             # Request/response schemas
├── services/
│   └── auth_service.py     # Authentication business logic
└── main.py                 # FastAPI application with auth router

scripts/
└── create_test_user.py     # Script to create test user

tests/
└── test_auth.py           # Unit tests for authentication
```

## Testing

### Unit Tests Coverage
- ✅ Successful login with valid credentials
- ✅ Invalid username (non-existent user)
- ✅ Correct username with wrong password
- ✅ Inactive user account
- ✅ Missing required fields
- ✅ Empty credentials
- ✅ Timing attack protection

### Running Tests
```bash
# Install test dependencies
pip install pytest

# Run authentication tests
pytest tests/test_auth.py -v
```

### Test User Creation
```bash
# Create a test user for manual testing
python scripts/create_test_user.py
```

This creates a user with:
- **Username**: testuser
- **Password**: testpass123
- **Role**: operational_manager

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Configuration
Create a `.env` file:
```bash
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=sqlite:////Users/henrymai/Chelton/EcoOmni/app.db
```

### 3. Create Test User
```bash
python scripts/create_test_user.py
```

### 4. Start the Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Test the Endpoint
```bash
# Test successful login
curl -X POST "http://localhost:8000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "testpass123"}'

# Test invalid credentials
curl -X POST "http://localhost:8000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "wrongpassword"}'
```

## API Documentation

The API documentation is automatically generated by FastAPI and available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Error Handling

### HTTP Status Codes
- **200 OK**: Successful authentication
- **401 Unauthorized**: Invalid credentials or inactive account
- **422 Unprocessable Entity**: Validation errors (missing fields, wrong types)
- **500 Internal Server Error**: Unexpected server errors

### Error Messages
- Generic error messages prevent username enumeration attacks
- Detailed validation errors for development/debugging
- Consistent error response format across all endpoints

## Security Considerations

### Production Recommendations
1. **Change Default Secret Key**: Use a strong, randomly generated secret key
2. **Use HTTPS**: Ensure all communication is encrypted
3. **Rate Limiting**: Implement rate limiting to prevent brute force attacks
4. **Database Security**: Use a production database (PostgreSQL) instead of SQLite
5. **Environment Variables**: Store sensitive configuration in environment variables
6. **Logging**: Implement comprehensive logging for security monitoring

### Vulnerability Mitigation
- **Timing Attacks**: Constant-time password comparison
- **SQL Injection**: SQLAlchemy ORM prevents SQL injection
- **XSS**: Input validation and sanitization
- **CSRF**: JWT tokens are not vulnerable to CSRF attacks

## Next Steps

This implementation provides a solid foundation for authentication. Future tickets could include:
- Password reset functionality
- User registration endpoint
- Role-based access control middleware
- Refresh token implementation
- Multi-factor authentication
- Session management and logout

## Dependencies Added

- `python-jose[cryptography]`: JWT token creation and verification
- `passlib[bcrypt]`: Secure password hashing
- `python-dotenv`: Environment variable management
- `pytest`: Unit testing framework
