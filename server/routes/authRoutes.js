import express from 'express';
import { register, login, logout, verifyOtp, sendVerificationOtp, isAuthenticated, sendRestPasswordOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verification-otp', userAuth, sendVerificationOtp);
authRouter.post('/verify-otp', userAuth, verifyOtp);
authRouter.post('/send-reset-password-otp', sendRestPasswordOtp);
authRouter.post('/is-authenticated', userAuth, isAuthenticated);
authRouter.post('/reset-password', resetPassword);
export default authRouter;

