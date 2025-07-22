# 🔐 MERN Authentication System

A robust, production-ready authentication system built with the MERN stack, featuring secure user registration, login, email verification, and password reset functionality.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

## ✨ Key Features

- **Secure Authentication**: JWT-based authentication with HTTP-only cookies
- **Email Verification**: OTP-based email verification system
- **Password Reset**: Secure password reset with email OTP
- **Input Validation**: Comprehensive data validation and sanitization
- **Security Best Practices**: bcrypt password hashing, CORS protection, secure headers
- **Production Ready**: Environment-based configurations and error handling
- **RESTful API**: Clean, well-structured API endpoints

## 🛠️ Technical Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and validation
- **Nodemailer** - Email service integration

### Security & Middleware
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Secure cookie handling
- **Input Sanitization** - Email normalization and validation
- **Environment Variables** - Secure configuration management

## 🚀 API Endpoints

```
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
POST /api/auth/logout            # User logout
POST /api/auth/send-verify-otp   # Send email verification OTP
POST /api/auth/verify-account    # Verify user email
POST /api/auth/send-reset-otp    # Send password reset OTP
POST /api/auth/verify-password-otp # Verify password reset OTP
POST /api/auth/reset-password    # Reset user password
GET  /api/auth/get-user-details  # Get authenticated user details
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Secure token-based authentication with expiration
- **HTTP-Only Cookies**: Prevents XSS attacks by making tokens inaccessible to JavaScript
- **CORS Protection**: Configured for specific origins with credentials support
- **Input Sanitization**: Email normalization and comprehensive validation
- **Environment-based Security**: Production-ready security configurations

## 🏗️ Project Structure

```
server/
├── config/
│   ├── mongodb.js      # Database configuration
│   └── nodemailer.js   # Email service setup
├── controllers/
│   └── authController.js # Authentication logic
├── middleware/
│   └── userAuth.js     # JWT verification middleware
├── models/
│   └── userModel.js    # User schema and model
├── routes/
│   └── authRoute.js    # API route definitions
└── server.js           # Application entry point
```

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/karanhimadri/MERN-Authentication.git
   cd MERN-Authentication/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create .env file with:
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SENDER_EMAIL=your_email@gmail.com
   SENDER_PASSWORD=your_app_password
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🎯 Professional Highlights

- **Scalable Architecture**: Modular design following MVC pattern
- **Production Deployment**: Docker containerization and environment configurations
- **Code Quality**: Clean, maintainable code with proper error handling
- **Security First**: Implementation of industry-standard security practices
- **API Design**: RESTful endpoints with consistent response formatting

## 📧 Contact

**Karan Himadri**  
Full Stack Developer  
📧 [karanhimadri@email.com](mailto:karanhimadri@email.com)  
🔗 [LinkedIn](https://linkedin.com/in/karanhimadri)  
🐱 [GitHub](https://github.com/karanhimadri)

---

*This project demonstrates proficiency in modern web development practices, secure authentication implementation, and full-stack development capabilities.*
