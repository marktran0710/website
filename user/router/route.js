const axios = require('axios');
const createError = require('http-errors')
const express = require('express');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const fs = require('fs');

const checkLogin = require("../middlewares/checkLogin")

const loginRoute = require('./auth/login')
const registerRoute = require('./auth/register')
const forgotRoute = require('./auth/forgot')

const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const MasterCategory = require('../models/masterCategoryModel');
const User = require('../models/userModel');

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();


router.use('/', loginRoute)
router.use('/', forgotRoute)
router.use('/', registerRoute)

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/creatorderdetails', async (req, res, next) => {
    let order_id = req.query.order_id
    if (!order_id) {
        return next(createError(500, 'Internal Server Error'));
    }
    let order = await Order.findOne({ order_id: order_id });
    if (!order) {
        return next(createError(500, 'Internal Server Error'));
    }
    else {
        return res.render('checkout', { 'order_details': order.order_details, 'total': order.total });
    }

});

router.get('/cart', async (req, res) => {
    const userId = req.cookies.userId || null;
    if (!userId) {
        res.redirect('/login');
        return;
    }

    const cartId = req.cookies.cartId || null;
    if (!cartId) {
        res.redirect('/shop');
        return;
    }

    let cart = await Cart.findOne({ userId, cartId, status: { $not: { $eq: 'deactive' } } });
    if (!cart) {
        return res.render('cart', { productsInCart: null });
    }
    else {
        products_info = await Product.find({
            article_id: {
                $in: [..._.keys(cart.products)]
            }
        }).lean();

        products_info = !_.isEmpty(products_info) ? products_info : null;

        if (!_.isEmpty(products_info)) {
            _.map(products_info, (element) => {
                if (_.has(cart.products, element.article_id)) {
                    element['quantity'] = cart.products[element.article_id]
                }
            })

            if (cart['status'] === 'deactive') {
                products_info = null;
            }
        }

        res.render('cart', { productsInCart: products_info || null });
    }
});

router.get('/checkout', async (req, res, next) => {
    res.render('checkout');
});

//Update checkout information
// router.post('/checkout/:order_id', async (req, res) => {
//     let order_id = req.params.order_id
//     let { info, type_payment } = { ...req.body }
//     let order = await Order.findOne({ order_id: order_id })
//     await order.update({
//         info: info,
//         type_payment: type_payment
//     })
//     await order.save()
//     res.render('checkout');
// });

router.get('/home', async (req, res, next) => {
    const userId = req.cookies.userId || null;
    const pagination = req.query.page || 1;
    const defaultProducts = await Product.find({}).limit(12).skip(12 * (pagination - 1));
    const mastercategories = await MasterCategory.find({});
    let recentProducts = []
    let recommendProducts = [];
    // Read the JSON file
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('An error occurred while reading the file:', err);
        } else {
            try {
                // Parse the JSON data
                recentProducts = JSON.parse(data);
            } catch (error) {
                console.error('An error occurred while parsing the JSON:', error);
            }
        }
    });


    await fetch(`http://${process.env.PYTHON_HOST || 'localhost'}:${process.env.PYTHON_PORT || 3001}/recommend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "customer_id": userId, "pagination": pagination })
    })
        .then(response => response.json())
        .then(data => {
            recommendProducts = data;
            return res.render('home', { products: recommendProducts, recentProducts: recentProducts, mastercategories: mastercategories });
        })
        .catch(error => {
            return res.render('home', { products: defaultProducts, recentProducts: recentProducts, mastercategories: mastercategories })
        });
});


// PROFILE
router.get('/myprofile', async (req, res) => {
    const userId = req.cookies.userId;
    const userInfo = await User.findOne({ userId });
    if (!userInfo) {
        return res.render('login');
    }
    return res.render('myprofile', { userInfo: userInfo });
})

router.get('/editmyprofile', async (req, res) => {
    const userId = req.cookies.userId || null;
    const userInfo = await User.find({ userId });
    if (!userInfo) {
        return res.render('login');
    }
    return res.render('editmyprofile', { userInfo: userInfo });
})

router.post('/editmyprofile', async (req, res) => {
    const body = req.body;
    if (body) {
        if (!body.day || !body.month || !body.year) {
            delete body.day;
            delete body.month;
            delete body.year;
        }

        for (let key in body) {
            if (body.hasOwnProperty(key) && body[key] === '') {
                delete body[key];
            }
        }
    }

    const userId = req.cookies.userId || null;
    const userInfo = await User.find({ userId });
    if (!userInfo) {
        return res.render('login');
    }

    let birth = null
    if (body.year && body.month && body.day) {
        birth = new Date(body.year, body.month, body.day);
    }

    if (birth) {
        await User.updateOne({ userId }, { $set: { ...body, birth: birth }, upsert: false, multi: true });
    }
    else {
        await User.updateOne({ userId }, { $set: { ...body }, upsert: false, multi: true });

    }

    return res.redirect('myprofile');
})

// MY ORDERS
router.get('/myorders', async (req, res) => {
    const userId = req.cookies.userId || null;
    const userInfo = await User.findOne({ userId });
    if (!userInfo) {
        return res.render('login');
    }
    const ordersList = await Order.find({ userId });
    return res.render('myorders', { ordersList: ordersList, userName: userInfo.username });
})

router.get('/detail/:productid', async (req, res, next) => {
    let products = await Product.find({}).limit(12);
    let product_id = parseInt(req.params.productid);
    let recommendProducts = []

    let item = await Product.findOne({ article_id: product_id }).exec();
    await fetch(`http://${process.env.PYTHON_HOST || "localhost"}:${process.env.PYTHON_PORT || 3001}/recommend`)
        .then(response => response.json())
        .then(data => {
            recommendProducts = data;
        })
        .catch(error => {
            recommendProducts = products;
        });

    if (item) {
        return res.render('detail', { products: recommendProducts, item: item });
    } else {
        next(createError(404, 'Item not found'));
    }
});

router.get('/history', async (req, res) => {
    const userId = req.cookies.userId || null;
    if (!userId) {
        res.redirect('/home');
        return;
    }

    const cartId = req.cookies.cartId || null;
    if (!cartId) {
        res.redirect('/home');
        return;
    }

    let carts = await Cart.find({ userId });
    if (!carts) {
        return res.redirect('/home');
    }
    const distinctProducts = [...new Set(carts.flatMap(cart => Object.keys(cart.products)))];
    const products = await Product.find({ article_id: { $in: distinctProducts } });
    return res.render('history', { products });
});

router.post('/search', async (req, res) => {
    if (!req.body) {
        return res.redirect('/home')
    }

    let {
        search_query,
        ...others
    } = { ...req.body }

    let search_result = await Product.find({ 'productDisplayName': { $regex: search_query } }).limit(50)
    res.render('search', { search_result: search_result });
});

router.get('/shop', async (req, res) => {
    let products = await Product.find({}).limit(12).skip((0));
    // let mastercategories = await MasterCategory.find({}).limit(12)
    return res.render('shop', { products: products });
});

module.exports = router;
