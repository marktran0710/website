const createError = require("http-errors")
const { default: mongoose } = require("mongoose");
const fs = require("fs")
const data = require("../products.json")
const express = require("express");

const Product = require("../models/productModel")
const Cart = require("../models/cartModel")


const cartRoute = express.Router();

cartRoute.get("/cart", async (req, res) => {
    res.render("cart", { message: null });
});



module.exports = cartRoute;
