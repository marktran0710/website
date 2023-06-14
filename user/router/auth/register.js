const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createError = require("http-errors")
const express = require("express");
const LOCATION = require("../../database/location.json")
const User = require("../../models/userModel")

const saltRounds = bcrypt.genSaltSync(10);

const registerRoute = express.Router();


registerRoute.get("/register", (req, res) => {
    res.render("auth/register", { LOCATION: LOCATION, message: null })
});

registerRoute.post("/register", async (req, res, next) => {

    if (!req.body) {
        return next(createError(400, "Bad Request"))
    }

    let {
        username,
        password,
        fullname,
        phone,
        email,
        nation,
        city,
        address
    } = { ...req.body }

    const isExistUser = await User.findOne({ email: email })

    if (isExistUser) {
        let message = "This email is registed. Please try again!"
        return res.render("auth/register", { LOCATION: LOCATION, message: message })
    }
    try {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            const user = new User({
                userId: crypto.randomBytes(32).toString('hex'),
                username: username,
                password: hash,
                fullname: fullname,
                email: email,
                phone: phone,
                nation: nation,
                city: city,
                address: address
            });
            user.save(function (err) {
                if (err) return res.render("register", { LOCATION: LOCATION, message: "Some thing went wrong!" })
                return res.redirect("auth/login", { message: null })
            });
        });

    } catch (error) {
        if (error) return next(createError(500, "Internal Server Error"));
        next()
    }

})

module.exports = registerRoute;
