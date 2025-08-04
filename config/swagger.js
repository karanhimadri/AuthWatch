import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Authentication API',
      version: '1.0.0',
      description: 'A comprehensive authentication microservice with user registration, login, email verification, and password reset functionality.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
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
          description: 'JWT token stored in HTTP-only cookie',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            isAccountVerified: {
              type: 'boolean',
              description: 'Whether the user account is verified',
            },
          },
        },
        UserRegistration: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password',
              example: 'password123',
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123',
            },
          },
        },
        OTPRequest: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '64f1a2b3c4d5e6f7g8h9i0j1',
            },
          },
        },
        VerifyEmail: {
          type: 'object',
          required: ['userId', 'otp'],
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '64f1a2b3c4d5e6f7g8h9i0j1',
            },
            otp: {
              type: 'string',
              description: '6-digit OTP',
              example: '123456',
            },
          },
        },
        ResetOTPRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
          },
        },
        VerifyResetOTP: {
          type: 'object',
          required: ['email', 'otp'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            otp: {
              type: 'string',
              description: '6-digit OTP',
              example: '123456',
            },
          },
        },
        ResetPassword: {
          type: 'object',
          required: ['email', 'newPassword'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            newPassword: {
              type: 'string',
              minLength: 6,
              description: 'New password',
              example: 'newpassword123',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        UserDetailsResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            userDetails: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Email Verification',
        description: 'Email verification related endpoints',
      },
      {
        name: 'Password Reset',
        description: 'Password reset functionality',
      },
      {
        name: 'User Management',
        description: 'User profile and details management',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API files
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
