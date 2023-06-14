const createError = require("http-errors");
const ObjectId = require('mongodb').ObjectId;
const User = require("../models/userModel");

const checkLogin = async (req, res, next) => {

    const userId = req.cookies.userId;
    try {
        const result = await User.findOne({ userId });
        if (userId == result['userId']) {
            return next();
        }
        return res.redirect("/login");
    }
    catch {
        return next(createError(500, "Internal Server"));
    }

}

module.exports = checkLogin