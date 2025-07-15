import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import dotenv from 'dotenv';
import sendEmail from '../config/emailService.js';
dotenv.config();

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const userExists = await UserModel.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters'});
        }
        const user = await UserModel.create({
            name,
            email,  
            password: await bcrypt.hash(password, 10),
        });
        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: false,
        });
        await sendEmail(user.email, 'Registration Successful', `You have successfully registered on MERN Authentication System ${user.name}`);

        res.status(200).json({'Registration Successful and Email Sent': user.email});
    } catch (error) {   
        res.status(500).json({message: 'Internal server error'});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: false,
        });
        res.status(200).json({'Login Successful': user.email});
    } catch (error) {   
        res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: 'User not logged in'});
        }
        res.clearCookie('token', {
            httpOnly: true,
            maxAge: 0,
            sameSite: 'none',
            secure: false,
        });
        res.status(200).json({message: 'User logged out'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

// Send Verification Otp Email to User
export const sendVerificationOtp = async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.userId});    
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        if(user.isAccountVerified){
            return res.status(400).json({message: 'User is already verified'});

        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verifyOtp = otp;
        user.verifyOtpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendEmail(user.email, 'Verification OTP', `Your OTP is ${otp}`);
        res.status(200).json({message: 'OTP sent successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

// Verify Otp
export const verifyOtp = async (req, res) => {
    try {
        const {otp} = req.body;
        if(!otp){
            return res.status(400).json({message: 'OTP is required'});
        }
        const user = await UserModel.findOne({_id: req.userId});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        if(user.verifyOtp !== otp){
            return res.status(400).json({message: 'Invalid OTP'});
        }
        if(user.verifyOtpExpiry < Date.now()){
            return res.status(400).json({message: 'OTP expired'});
        }
        user.verifyOtp = null;
        user.verifyOtpExpiry = null;
        user.isAccountVerified = true;
        await user.save();
        res.status(200).json({message: 'Account verified successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

export const isAuthenticated =  async (req,res)=>{
    try{
        return res.json({
            success: true,
            message: 'User is Authenticated',
        })

    }catch(error){
        return res.json({
            success: false,
            message: 'User is not Authenticated',
        })
    }

}

export const sendRestPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({message: 'Email is required'});
        }
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        if(!user.isAccountVerified){
            return res.status(400).json({message: 'User is not verified'});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.forgotPasswordOtp = otp;
        user.forgotPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendEmail(user.email, 'Reset Password OTP', `Your OTP is ${otp}`);
        res.status(200).json({message: 'OTP sent successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}
export const resetPassword = async (req, res) => {
    try {
        const {email, otp, newPassword} = req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({message: 'Email, OTP and new password are required'});
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        if(user.forgotPasswordOtp !== otp){
            return res.status(400).json({message: 'Invalid OTP'});
        }
        if(user.forgotPasswordOtpExpiry < Date.now()){
            return res.status(400).json({message: 'OTP expired'});
        }
        if(!newPassword){
            return res.status(400).json({message: 'New password is required'});
        }
        if(newPassword.length < 6){
            return res.status(400).json({message: 'New password must be at least 6 characters'});
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if(isSamePassword){
            return res.status(400).json({message: 'New password must be different from old password'});
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.forgotPasswordOtpExpiry = null;
        user.forgotPasswordOtp = null;

        
        await user.save();
        res.status(200).json({message: 'Password reset successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}