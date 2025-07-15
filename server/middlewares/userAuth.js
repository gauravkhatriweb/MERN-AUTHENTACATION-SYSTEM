import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: 'Unauthorized login required'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({message: 'Unauthorized login required'});
    }
}

export default userAuth;
