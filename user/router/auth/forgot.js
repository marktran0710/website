const bcrypt = require('bcrypt');
const createError = require("http-errors")
const { default: mongoose } = require("mongoose");
const express = require("express");
const otpGenerator = require('otp-generator')

const User = require("../../models/userModel")

const forgotRoute = express.Router();

let CODE = null
let EMAIL = null

forgotRoute.get("/forgot", async (req, res) => {
    res.render("auth/forgot", { message: null });
});

//POST in Forgot password page
forgotRoute.post("/forgot", async (req, res, next) => {
    if (!req.body) {
        next(createError(400, "Bad Request"))
    }
    if (!req.body.email) {
        res.render("auth/forgot", { message: "Not fill" });
    }

    let { email } = { ...req.body }
    // Use for reset password with url /check-new-pass
    EMAIL = email

    const isExistUser = await User.findOne({ email: email })
    if (isExistUser) {
        CODE = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        // sendEmail(CODE, email)
        res.render("auth/send_opt");
    } else {
        res.render("auth/forgot", { message: null });
    }

});

//POST in reset password with OTP parameter
forgotRoute.post("/reset-pass", (req, res, next) => {
    if (!req.body) {
        next(createError(400, "Bad Request"))
    }

    let { code } = { ...req.body }

    if (code) {
        if (code === CODE) {
            res.render("auth/set_pass", { message: null })
        }
        res.render("auth/send_opt");
    } else {
        res.render("auth/forgot", { message: null });
    }

});

forgotRoute.post("/check-new-pass", async (req, res, next) => {
    if (!req.body) {
        return next(createError(400, "Bad Request"))
    }

    let { password, confirm_password } = { ...req.body }
    if (password != confirm_password) {
        return res.render("auth/set_pass", { message: "Your password and confirmation password must match" })
    }

    await connect()
    const isExistUser = await User.findOne({ email: EMAIL })
    if (isExistUser) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        isExistUser.overwrite({ password: hash });
    }

    return res.render("auth/login", { message: null });

})

module.exports = forgotRoute;
