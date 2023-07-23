const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();


app.use('/api/v1/users', userRouter);

module.exports = app;