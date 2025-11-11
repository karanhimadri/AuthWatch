const express = require("express");
const {
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetPasswordOTP,
  getUserAuthDetails
} = require("../controllers/authController");
const userAuth = require("../middleware/userAuth");

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.post("/send-verify-otp", userAuth, sendVerifyOtp);

authRoutes.post("/verify-account", userAuth, verifyEmail);

authRoutes.post("/send-reset-otp", sendResetOtp);

authRoutes.post("/verify-password-otp", verifyResetPasswordOTP);

authRoutes.post("/reset-password", resetPassword);

authRoutes.get("/get-user-details", userAuth, getUserAuthDetails);

module.exports = authRoutes;

