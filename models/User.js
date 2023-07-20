const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell your name ']
    },
    email: {
        type: String,
        required: [true, 'Please tell your email '],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email !'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: [true, 'Please tell your password '],
        match: [
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, //Minimum six characters, at least one letter and one number
            "Please provide a valid password",
        ],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password '],
        validate: {
            //This only works on save .create() || .save()
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isHired: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    workedAt: [{ type: mongoose.Schema.ObjectId, ref: 'Company' }]
});



const User = mongoose.model('User', userSchema);
module.exports = User;
