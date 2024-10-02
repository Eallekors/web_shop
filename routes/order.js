const express = require('express');
const orderController = require('../controllers/order');
const router = express.Router();

// Route to handle order processing
router.post('/create', (req,res) => orderController.createOrder(req,res));
 

module.exports = router;
