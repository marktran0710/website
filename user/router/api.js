const createError = require('http-errors')
const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const uploadImageToDrive = require('../services/uploadImage');
const checkLogin = require('../middlewares/checkLogin');
const _ = require('lodash');

const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const MasterCategory = require("../models/masterCategoryModel");
const SubCategory = require("../models/subCategoryModel");
const ArticleType = require("../models/articleTypeModel");
const Cart = require("../models/cartModel");
const Admin = require("../models/adminModel");


const dotenv = require("dotenv");
dotenv.config();

// const upload = multer({ dest: './public/uploads/' });

const api = express.Router();

api.use(cors());
api.use(bodyParser.json())

PYTHON_HOST = process.env.PYTHON_HOST
PYTHON_PORT = process.env.PYTHON_PORT

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the desired storage destination
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        // Use the original filename for storing the file
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

api.get('/pagination', async (req, res) => {
    const userId = req.cookies.userId || null
    const pagination = req.query.page || 1
    let products = []

    await fetch(`http://${PYTHON_HOST}:${PYTHON_PORT}/recommend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "customer_id": userId, "pagination": pagination })
    })
        .then(response => response.json())
        .then(data => { products = data; return res.status(200).json(products).end() })
        .catch(error => {
            return res.status(500).json('Internal Server Error').end()
        });

})


api.post('/checkout', async (req, res) => {
    if (!req.body) {
        return res.status(400);
    }

    const userId = req.cookies.userId || null;
    if (!userId) {
        return res.status(403).end();
    }

    const cartId = req.cookies.cartId || null;
    if (!cartId) {
        return res.status(500).end();
    }
    else {
        // Create new order
        const order = new Order({
            orderId: uuidv4(),
            cartId: cartId,
            userId: req.cookies.userId,
            products: req.body.orderCart['products'],
            payment: req.body.userInfo['payment'],
            address: req.body.userInfo['address'] + req.body.userInfo['city'],
            total: req.body.orderCart['total'],
            shipping: 'processing'
        })
        order.save();

        await Cart.updateOne({ userId, cartId }, { $set: { status: 'deactive' } })
        return res.status(200).end();
    }

});

// CART
api.get("/getnumberitemsincart", async (req, res, next) => {
    const userId = req.cookies.userId || null;
    const cartId = req.cookies.cartId || null;
    if (!userId && !cartId) {
        res.json({ products: 0 });
    }
    else {
        const cart = await Cart.findOne({ userId, cartId, status: { $not: { $eq: 'deactive' } } });
        let sum = cart ? _.sum(_.values(cart['products'])) : 0;
        res.json({ products: sum });
    }

})

api.post("/additemtocart", async (req, res, next) => {
    const productId = req.body.productId || null;
    if (!productId) {
        return;
    }

    let cartId = req.cookies.cartId || null;
    let userId = req.cookies.userId || null;

    if (!userId) {
        userId = uuidv4();
        res.cookie('tempUserId', userId, { maxAge: 1000 * 60 * 60 * 24 });
    }
    let userExisted = await Cart.findOne({ userId, cartId })
    if (userExisted && userExisted['status'] !== 'deactive') {
        // list_products_by_user {"123":1, "456":2}
        // update list bought products by user
        const list_products_by_user = userExisted['products']
        let isItemExisted = _.has(list_products_by_user, productId);
        if (!isItemExisted) {
            list_products_by_user[productId] = 1
            await userExisted.updateOne({ products: { ...list_products_by_user } });
            await userExisted.save();
        } else {
            let updatedList = _.set(list_products_by_user, productId, list_products_by_user[productId] + 1);
            await userExisted.updateOne({ products: { ...updatedList } });
            await userExisted.save();
        }
    } else {
        // create new cart if user does not have cart
        try {
            let obj = {}
            obj[productId] = 1
            let cart = await new Cart({
                cartId: uuidv4(),
                userId: userId,
                status: 'active',
                products: obj
            });
            await cart.save();
            res.cookie('cartId', cart.cartId, { maxAge: 1000 * 60 * 60 * 24 });

        } catch (error) {
            if (error) next(createError(500, "Internal Server Error"));
            return;
        }
    }

    // //Return list products infor in cart
    let products_info = []
    userExisted = await Cart.findOne({ userId, cartId });
    if (userExisted) {
        list_products_by_user = userExisted['products']
        products_info = await Product.find({
            article_id: {
                $in: [..._.keys(list_products_by_user)]
            }
        }).lean();
    }

    res.status(200).end();
    return;
});

api.post('/removeitemincart', async (req, res) => {

    const productId = req.body.productId || null;
    const cartId = req.cookies.cartId || null;
    const userId = req.cookies.userId || null;
    if (!userId || !cartId) {
        return res.status(403).end();
    }

    let userExisted = await Cart.findOne({ userId, cartId })
    if (userExisted && userExisted['status'] !== 'deactive') {
        // list_products_by_user {"123":1, "456":2}
        // update list bought products by user
        const list_products_by_user = userExisted['products']
        let isItemExisted = _.has(list_products_by_user, productId);
        if (isItemExisted) {
            const updatedObj = _.omitBy(list_products_by_user, (value, key) => key === productId);
            const updatedDocument = await Cart.findOneAndUpdate(
                { userId, cartId },
                { $set: { products: updatedObj } },
                { returnOriginal: false })
            return res.status(200).end();
        }
    } else {
        return res.status(404).end()
    }

})

api.get("/getcategories", async (req, res) => {
    let products = await MasterCategory.find({});
    return res.json(products)
})

// PRODUCT
api.get("/getproducts", async (req, res) => {
    const pagination = req.query.page || 1
    let products = await Product.find({}).limit(12).skip(12 * (pagination - 1));
    return res.json(products)
})

api.delete("/product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.deleteOne({ article_id: productId })
        res.status(200).json(`Delete item ${productId} successfully!`)
    } catch (error) {
        res.status(500).json(`Something error!`)
    }
})

api.get("/product/:id", async (req, res) => {
    const productId = req.params.id || null;
    try {
        const product = await Product.findOne({ article_id: productId }).lean();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(`Something error!`)
    }
})

api.post('/product', upload.single('image'), async (req, res) => {

    try {
        const { productDisplayName, detail_desc, articleType, price, subCategory, mastercategories, color } = req.body;

        const { originalname, mimetype, path } = req.file;

        const image = await uploadImageToDrive(path, originalname);

        const article_id = uuidv4();
        const newProduct = new Product({
            article_id, productDisplayName, detail_desc, articleType, price: parseInt(price), subCategory, mastercategories, color, image
        })
        newProduct.save()

        res.status(200).json({ message: 'Product information uploaded successfully!' });

    } catch (error) {
        res.status(500).json(`Something error!`)
    }
})

api.post('/product/:productId', upload.single('image'), async (req, res) => {

    try {
        const productId = req.params.productId || null;
        const product = await Product.findOne({ article_id: productId });

        if (_.isEmpty(product)) {
            return res.status(404).end();
        }
        const { productDisplayName, detail_desc, articleType, price, subCategory, mastercategories, color } = req.body;

        if (!_.isEmpty(req.file)) {
            const { originalname, mimetype, path } = req.file;
            const image = await uploadImageToDrive(path, originalname);
            await product.updateOne({ productDisplayName, detail_desc, articleType, price: parseInt(price), subCategory, mastercategories, color, image });
        } else {
            await product.updateOne({ productDisplayName, detail_desc, articleType, price: parseInt(price), subCategory, mastercategories, color });
        }
        await product.save();

        return res.status(200).json({ message: 'Product information uploaded successfully!' }).end();

    } catch (error) {
        return res.status(500).json(`Something error!`).end();
    }
})


api.post('/updatestateproduct', async (req, res) => {

    try {
        if (_.isEmpty(req.body)) {
            return res.status(400).end();
        }
        const { productId, productStatus } = req.body;
        await Product.updateOne({ article_id: productId }, { $set: { disabled: productStatus } })

        return res.status(200).json({ message: 'Update product status successfully!' }).end();

    } catch (error) {
        return res.status(500).json(`Something error!`).end();
    }
})

// PRODUCT TYPES
api.get("/producttypes", async (req, res) => {
    const productTypes = await ArticleType.find({});
    return res.json(productTypes);
})

// SUB CATEGORIES
api.get("/subcategories", async (req, res) => {
    const subcategories = await SubCategory.find({});
    return res.json(subcategories);
})

// MASTER CATEGORIES
api.get("/mastercategories", async (req, res) => {
    const mastercategories = await MasterCategory.find({});
    return res.json(mastercategories);
})

// ORDER
api.get("/orders", async (req, res) => {
    const orders = await Order.find({});
    return res.json(orders);
})

api.post('/updatestateorder', async (req, res) => {

    try {
        if (_.isEmpty(req.body)) {
            return res.status(400).end();
        }
        const { orderId, disabled } = req.body;
        await Order.updateOne(
            { orderId },
            { $set: { disabled: Boolean(disabled) } },
            { upsert: true, new: true })

        return res.status(200).json({ message: 'Update product status successfully!' }).end();

    } catch (error) {
        return res.status(500).json(`Something error!`).end();
    }
})

api.get("/order/:orderId", async (req, res) => {
    const orderId = req.params.orderId || null;
    try {
        const order = await Order.findOne({ orderId: orderId }).lean();
        if (_.isEmpty(order)) {
            return res.status(404).end();
        }
        return res.status(200).json(order).end();
    } catch (error) {
        res.status(500).json(`Something error!`)
    }
})

api.post('/order/:orderId', async (req, res) => {

    try {
        const orderId = req.params.orderId || null;
        const order = await Order.findOne({ orderId });

        if (_.isEmpty(req.body)) {
            return res.status(400).end();
        }

        if (_.isEmpty(order)) {
            return res.status(404).end();
        }
        let { shipping, payment, disabled } = req.body;

        disabled = JSON.parse(disabled) ? true : false;

        await Order.findOneAndUpdate(
            { orderId },
            { $set: { shipping, payment, disabled } },
            { upsert: true, new: true }
        );

        return res.status(200).json({ message: 'Order information uploaded successfully!' }).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json(`Something error!`).end();
    }
})

// USER
api.get("/users", async (req, res) => {
    const users = await User.find({});
    return res.json(users);
})

// DASHBOARD
api.get("/dashboard", async (req, res) => {
    try {
        const users = await User.countDocuments({});
        const orders = await Order.find({}).lean();
        const total = orders.reduce((accumulator, document) => {
            const totalValue = parseInt(document.total.replace(',', ''));
            return accumulator + totalValue;
        }, 0);

        return res.status(200).json({ users, orders: orders.length, earning: total }).end();
    } catch (error) {
        return res.status(500).json(`Something error!`).end();
    }
})

api.get("/chart", async (req, res) => {
    try {
        const orders = await Order.find({}).lean();

        const monthlyTotals = {};

        // Iterate over the documents and calculate the monthly totals
        orders.forEach(document => {
            const date = new Date(document.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based

            const totalValue = parseInt(document.total.replace(',', ''));

            // Add the total to the corresponding month in the monthlyTotals object
            if (!monthlyTotals.hasOwnProperty(year)) {
                monthlyTotals[year] = {};
            }

            if (!monthlyTotals[year].hasOwnProperty(month)) {
                monthlyTotals[year][month] = 0;
            }

            monthlyTotals[year][month] += totalValue;
        });

        return res.status(200).json({ monthlyTotals }).end();
    } catch (error) {
        return res.status(500).json(`Something error!`).end();
    }
})

// ADMIN
api.post("/adminlogin", async (req, res) => {
    if (_.isEmpty(req.body)) {
        return res.status(500).end();
    }
    const { username, password } = req.body;
    const user = await Admin.findOne({ username, password });
    if (_.isEmpty(user)) {
        return res.status(500).end();
    }
    return res.status(200).json(user);
})
api.post("/getproductsbyfilteringprice", async (req, res, next) => {
    let minimum_limit = req.body.minimum_limit;
    let upper_limit = req.body.upper_limit;
    const pagination = req.query.page || 1
    let products = [];

    try {
        if (minimum_limit && upper_limit) {
            products = await Product.find({ price: { $gte: minimum_limit, $lte: upper_limit } }).limit(12).skip(12 * (pagination - 1))
            return res.json(products)
        }
        else if (minimum_limit) {
            products = await Product.find({ price: { $gte: minimum_limit } }).limit(12).skip(12 * (pagination - 1))
            return res.json(products)
        }
        else if (upper_limit) {
            products = await Product.find({ price: { $lte: upper_limit } }).limit(12).skip(12 * (pagination - 1))
            return res.json(products)
        }
        else {
            products = await Product.find({}).limit(12)
            return res.json(products)
        }
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }

})

api.post("/getproductsbyfilteringcolor", async (req, res, next) => {
    let colors_list = req.body.all_active_colors;
    let products = [];

    try {
        if (colors_list) {
            products = await Product.find({ color: { $in: [colors_list] } }).limit(12)
            return res.json(products)
        }
    } catch (error) {
        return res.status(500).json("Internal Server")
    }

})

module.exports = api;