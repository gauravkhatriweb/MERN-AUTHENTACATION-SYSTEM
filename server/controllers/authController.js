import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import dotenv from 'dotenv';
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
        res.status(200).json({'Registration Successful': user.email});
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