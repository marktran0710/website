const bcrypt = require('bcrypt');
const { default: mongoose } = require("mongoose");
const express = require("express");
const fs = require('fs');
const _ = require('lodash')

const User = require("../../models/userModel")


const loginRoute = express.Router();


loginRoute.get("/login", async (req, res) => {
    res.render("auth/login", { message: null });
});

loginRoute.post("/login", async (req, res, next) => {

    if (!req.body) {
        return next(createError(400, "Bad Request"))
    }

    const { email, password } = { ...req.body }
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
        bcrypt.compare(password, isExistUser.password, function (err, result) {
            if (result == true) {
                const oneDay = 1000 * 60 * 60 * 24;
                res.cookie('userId', isExistUser['userId'], { maxAge: oneDay });
                res.cookie('fullname', isExistUser['fullname'], { maxAge: oneDay });
                res.locals.loginStatus = 'success';
                return res.redirect("/home")
            }
            // else if (_.isEmpty(err)) {
            //     next(createError(500, "Internal Server Error"));
            // }
            // else {
            //     return res.render("auth/login", {
            //         message: "Username or password is not true!"
            //     });
            // }
        });
    }
    else {
        return res.render("auth/login", {
            message: "Username or password is not true!"
        });
    }

});

module.exports = loginRoute;
