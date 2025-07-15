import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import conntectDB from './config/mongoDB.js';

const app = express();
const port = process.env.PORT || 4000;

conntectDB();

app.use(express.json());
app.use(cors({credentials:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
  res.send('API WORKING!');
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
