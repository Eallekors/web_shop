const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product')

router.get('/products', (req, res) => productController.getAllProducts(req,res));
router.get('/product/:id', (req, res) => productController.getProductbyId(req,res));

router.post('/product/add', (req,res) => productController.addProduct(req, res));
router.all('/product/edit/:id', (req,res) => productController.updateProduct(req, res));
router.all('/product/delete/:id', (req, res) => productController.deleteProduct(req, res));

module.exports = router