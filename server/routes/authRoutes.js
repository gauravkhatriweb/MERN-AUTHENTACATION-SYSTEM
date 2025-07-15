import express from 'express';
import { register, login, logout, verifyOtp, sendVerificationOtp } from '../controllers/authController.js';
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verification-otp', sendVerificationOtp);
authRouter.post('/verify-otp', verifyOtp);
export default authRouter;