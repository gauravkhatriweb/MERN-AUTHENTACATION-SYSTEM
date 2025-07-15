import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        res.status(200).json({user, token});
    } catch (error) {   
        res.status(500).json({message: 'Internal server error'});
    }
}