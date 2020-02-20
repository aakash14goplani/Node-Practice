const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProducts);

router.get('/products', adminController.getProducts);

router.use(bodyParser.urlencoded({extended: false}));

router.post('/add-product', adminController.postAddProducts);

module.exports = router;

