const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./DB/connectDB');
const app = require('./app');

app.use(express.json());


const PORT = process.env.PORT || 8000;
const server = async () => {
    try {
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
        const DB = process.env.DB_URI.replace(
            "<password>",
            process.env.DB_PASSWORD
        );
        await connectDB(DB);
    } catch (error) {
        console.log(error);
    }
};

server();