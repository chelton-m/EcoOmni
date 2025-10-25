# EcoOmni UI - Login System

This directory contains the frontend login system for the EcoOmni application.

## Files

- `login.html` - Main login page with authentication form
- `dashboard.html` - Dashboard page for Directors/Admins
- `upload.html` - Upload page for Operational Managers
- `types/auth.ts` - TypeScript type definitions (for future TypeScript migration)

## Features

### Login Page (`login.html`)
- ✅ Username and password input fields
- ✅ Password masking
- ✅ Login button
- ✅ Error message display
- ✅ Loading state during login
- ✅ Role-based redirection
- ✅ Demo credentials displayed

### Acceptance Criteria Met

- **AC-1**: Text input for username and masked password input ✅
- **AC-2**: Login button ✅
- **AC-3**: API call to backend login endpoint ✅
- **AC-4**: Role-based redirection (Manager → Upload, Director → Dashboard) ✅
- **AC-5**: Error message display on failed login ✅

## How to Use

### Option 1: Direct File Access
Simply open `UI/login.html` in your web browser.

### Option 2: Using a Local Server
```bash
# Using Python
cd UI
python3 -m http.server 3000

# Or using Node.js
npx http-server -p 3000
```

Then navigate to `http://localhost:3000/login.html`

## Demo Credentials

| Username | Password | Role | Redirects To |
|----------|----------|------|--------------|
| testuser | testpass123 | operational_manager | upload.html |
| director | director123 | director | dashboard.html |
| admin | admin123 | system_admin | dashboard.html |

## Requirements

- Backend API running on `http://localhost:8001` (see main README)
- Modern web browser with JavaScript enabled
- Test users created in the backend database

## Testing

1. Start the backend API (see main project README)
2. Open `login.html` in a web browser
3. Enter demo credentials and click "Sign in"
4. Verify correct redirection based on role
5. Test error handling with incorrect credentials

## Next Steps

Future tickets will add:
- More sophisticated UI framework integration
- Advanced error handling
- Remember me functionality
- Password reset flow
