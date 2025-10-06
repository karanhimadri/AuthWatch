import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Authentication API Documentation',
      version: '1.0.0',
      description: 'Secure MERN authentication API with user registration, email verification, JWT login, and password reset functionality.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      termsOfService: 'https://yourdomain.com/terms',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f1a2b3c4d5e6f7g8h9i0j1' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            isAccountVerified: { type: 'boolean', example: true },
          },
        },
        UserRegistration: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', minLength: 2, example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            password: { type: 'string', minLength: 6, example: 'password123' },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        OTPRequest: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: { type: 'string', example: '64f1a2b3c4d5e6f7g8h9i0j1' },
          },
        },
        VerifyEmail: {
          type: 'object',
          required: ['userId', 'otp'],
          properties: {
            userId: { type: 'string', example: '64f1a2b3c4d5e6f7g8h9i0j1' },
            otp: { type: 'string', minLength: 6, maxLength: 6, example: '123456' },
          },
        },
        ResetOTPRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          },
        },
        VerifyResetOTP: {
          type: 'object',
          required: ['email', 'otp'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            otp: { type: 'string', minLength: 6, maxLength: 6, example: '123456' },
          },
        },
        ResetPassword: {
          type: 'object',
          required: ['email', 'newPassword'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            newPassword: { type: 'string', minLength: 6, example: 'newpassword123' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation completed successfully' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
          },
        },
        UserDetailsResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            userDetails: { $ref: '#/components/schemas/User' },
          },
        },
      },
    },
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Email Verification', description: 'Email verification with OTP' },
      { name: 'Password Reset', description: 'Password reset functionality' },
      { name: 'User Management', description: 'User profile management' },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Paths to scan for JSDoc comments
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };