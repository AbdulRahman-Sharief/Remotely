const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const dbConnection = require('./DB/connectDB');
const app = require('./app');
const authRoute=require('./route/authRoute')
dbConnection();

app.use(express.json());

//mount route
app.use('/api/v1/auth', authRoute);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT} ...`)
})