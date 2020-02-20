const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/add-product', productsController.getAddProducts);

router.use(bodyParser.urlencoded({extended: false}));

router.post('/add-product', productsController.postAddProducts);

module.exports = router;

