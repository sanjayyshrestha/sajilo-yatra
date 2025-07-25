

const express=require('express');
const connectDB = require('./config/db');
const app=express();
const cookieParser=require('cookie-parser');
const userRouter = require('./routes/userRoute');
require('dotenv').config();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8080', // your frontend URL
  credentials: true, // allow cookies to be sent
}));

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',userRouter)
connectDB()
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
  })
})
