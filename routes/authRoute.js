import express from "express";
import {
  isUserAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);x
authRoutes.post("/logout", logout);
authRoutes.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRoutes.post("/verify-account", userAuth, verifyEmail);
authRoutes.post("/is-auth", userAuth, isUserAuthenticated);
authRoutes.post("/send-reset-otp", sendResetOtp);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
