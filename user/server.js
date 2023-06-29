const bodyParser = require('body-parser')
const connect = require("./services/conMongo")
const cors = require("cors");
const createError = require("http-errors")
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const fetch = require('node-fetch');
const fs = require('fs');


const router = require("./router/route");
const api = require("./router/api");

const User = require("./models/userModel");
const Product = require('./models/productModel')


//Get environment variables
dotenv.config();
PORT = process.env.PORT;
MONGO = process.env.MONGO;


const app = express();

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(passport.initialize());
// app.use(passport.session());

//Create new app instance and set Cross Origin Resource Sharing
app.use(cors());

//Set up ejs engine and public static files
app.set("view engine", "ejs");
app.set("views", "./views/pages");
app.use(express.static(path.join(__dirname, '/public')))

connect()


app.get("/", (req, res) => {
  res.render("loading")
})

app.use(async (req, res, next) => {
  // Set login status for display account status
  const userId = req.cookies.userId
  if (!userId) {
    res.locals.loginStatus = 'fail'
  }
  else {
    const isCustomerExisted = await User.find({ userId: userId });
    res.locals.loginStatus = isCustomerExisted ? 'success' : 'fail'
  }
  next()
})

app.use("/", api);
app.use("/", router);

// // handle page not found
// app.use((req, res, next) => {
//   next(createError(404, "Page is not found"))
// });

app.use((err, req, res, next) => {
  if (err) {
    return res.render("error", {
      code: err.status || 500,
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
