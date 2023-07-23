const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const user = require('../models/User')


const createtoken = (payload) => jwt.sign({ userId: payload }, process.env.jwt_secret_key, { expiresIn: process.env.jwt_expire_time })
exports.signUp = asyncHandler(async (req, res, next) => {
    //create user
    const User = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    //gnrate token
    const token = createtoken(User._id);

    res.status(201).json({ data: User, token });
})


exports.login = asyncHandler(async (req, res, next) => {
    const User = await user.findOne({ email: req.body.email });

    if (!User || !(await bcrypt.compare(req.body.password, User.password))) {

        return next(new Error("incorect email or password"));
    }

    const token = createtoken(User._id);

    res.status(200).json({ data: User, token })
})
exports.protect = asyncHandler(async (req, res, next) => {
    //1:check if token exist
    //console.log(req.headers)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {

        return next(new Error("you are not login to get acsses this route"))
    }

    //2:verfiy token(change happen ,expired token)
    const decoded = jwt.verify(token, process.env.jwt_secret_key)

    //2:check if user exist
    const curentUser = await user.findById(decoded.userId);
    if (!curentUser) {

        return next(new Error("THE USER THAT BELONG TO THIS TOKEN DOSENT LONGER EXSIST"))
    }
    //check if user change his pass after token created
    if (curentUser.passwordChangedAt) {
        const passChangedTimeStamp = parseInt(curentUser.passwordChangedAt.getTime() / 100, 10)
        if (passChangedTimeStamp > decoded.iat) {

            return next(new Error("user resntly changed his password"))
        }
    }
    req.user = curentUser;
    next()
});