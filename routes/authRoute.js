import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetPasswordOTP,
  getUserAuthDetails
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRoutes = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
authRoutes.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 */
authRoutes.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Auth]
 */
authRoutes.post("/logout", logout);

/**
 * @swagger
 * /api/auth/send-verify-otp:
 *   post:
 *     summary: Send OTP to verify email
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 */
authRoutes.post("/send-verify-otp", userAuth, sendVerifyOtp);

/**
 * @swagger
 * /api/auth/verify-account:
 *   post:
 *     summary: Verify user email with OTP
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 */
authRoutes.post("/verify-account", userAuth, verifyEmail);

/**
 * @swagger
 * /api/auth/send-reset-otp:
 *   post:
 *     summary: Send OTP to reset password
 *     tags: [Password]
 */
authRoutes.post("/send-reset-otp", sendResetOtp);

/**
 * @swagger
 * /api/auth/verify-password-otp:
 *   post:
 *     summary: Verify reset OTP
 *     tags: [Password]
 */
authRoutes.post("/verify-password-otp", verifyResetPasswordOTP);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset the password
 *     tags: [Password]
 */
authRoutes.post("/reset-password", resetPassword);

/**
 * @swagger
 * /api/auth/get-user-details:
 *   get:
 *     summary: Get authenticated user details
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 */
authRoutes.get("/get-user-details", userAuth, getUserAuthDetails);

export default authRoutes;
