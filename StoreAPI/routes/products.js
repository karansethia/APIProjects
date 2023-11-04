const express = require('express');
const { getAllProducts, getAllProductsStatic } = require('../controllers/products');

const router = express.Router();

router.get('/products', getAllProducts)
router.get('/static', getAllProductsStatic)

module.exports = router