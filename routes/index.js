
//loading from env file....
require("dotenv").config();
console.log("PayPal Client ID:", process.env.PAYPAL_CLIENT_ID);

var express = require('express');
var router = express.Router();
var shop = require("../model/shop")
// Get request for home page.......... 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
