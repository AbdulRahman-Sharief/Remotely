const mongoose = require('mongoose');

const connectDB = (DB) => {
    mongoose
        .connect(DB)
        .then((conn) => {
            // console.log(`Database Connected: ${conn.connection.host}`);
            console.log(
                `connected to DATABASE ((${DB.split("/")[3]})) Successfully!!`
            );
        })
        .catch((err) => {
            console.error(`Database Error: ${err}`);
            process.exit(1);
        });
};

module.exports = connectDB;