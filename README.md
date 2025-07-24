# George W. Bush Website Admin Panel

This admin panel allows authorized administrators to manage:
- Urgent appointment requests
- Scheduling requests
- Contact messages
- Email subscriptions

## Features

- **Dashboard**: Overview of all data with statistics and quick access
- **Urgent Appointments**: View, approve, reject, and delete appointment requests
- **Scheduling Requests**: Manage scheduling requests for President Bush
- **Contact Messages**: Handle contact form submissions with status tracking
- **Subscriptions**: Manage email subscriptions and preferences

## Setup

### Backend
1. Install dependencies:
   ```
   cd backend
   npm install
   ```

2. Set environment variables:
   Create a `.env` file in the backend directory with the following:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=1d
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

### Frontend
1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the frontend development server:
   ```
   npm start
   ```

## Admin User Setup

To create the first admin user, use the following API endpoint:

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

In a production environment, this endpoint should be secured or disabled after initial setup.

## Accessing the Admin Panel

1. Navigate to `/admin/login` in your browser
2. Enter your admin credentials
3. You'll be redirected to the admin dashboard

## Security Considerations

- All admin routes are protected by JWT authentication
- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 24 hours by default

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcrypt

## License

This project is proprietary and confidential. 