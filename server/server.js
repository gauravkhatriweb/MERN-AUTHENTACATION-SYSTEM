import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import conntectDB from './config/mongoDB.js';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

conntectDB(); 

app.use(express.json());
// Add error handling after body parser
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }
    next();
});
app.use(cors({credentials:true}));
app.use(cookieParser());
// API ENDPOINT
app.get('/',(req,res)=>{
  res.send('API WORKING!');
})
app.use('/api/auth', authRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
