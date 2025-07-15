# MERN Authentication System

## Project Overview
A robust and secure authentication/user management API built with the MERN stack. This system provides comprehensive user authentication features including registration, login, email verification, password reset, and secure user data management.

## Developer Note
This codebase has been thoroughly reviewed and enhanced by [Gaurav Khatri](https://github.com/gauravkhatriweb) to implement best practices in security, error handling, and code organization.

## Key Enhancements
- 🔐 Improved security with proper JWT implementation and secure cookie handling
- 📧 Enhanced email service with HTML support and better error handling
- 🎯 Consistent API response format across all endpoints
- 📝 Comprehensive JSDoc documentation and inline comments
- ⚡ Optimized database queries and connection handling
- 🛡️ Robust input validation and data sanitization
- 🔄 Improved OTP generation and verification system

## Folder Structure
```
server/
├── config/
│   ├── emailService.js    # Email configuration and service
│   └── mongoDB.js         # Database connection setup
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── userController.js  # User management logic
├── middlewares/
│   └── userAuth.js       # JWT authentication middleware
├── models/
│   └── userModel.js      # User schema and model
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── userRoute.js      # User management routes
└── server.js             # Main application entry
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd MERN-AUTHENTACATION-SYSTEM
   ```

2. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the server directory with the following variables:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **Security**: bcrypt for password hashing

## API Features
- User registration with email verification
- Secure login with JWT authentication
- Password reset with OTP verification
- Protected user profile management
- Secure session handling with HTTP-only cookies

## License
MIT License

## Developer
Maintained and enhanced by [Gaurav Khatri](https://github.com/gauravkhatriweb)