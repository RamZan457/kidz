// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes for handling cart requests
router.post('/get-carts', cartController.getCarts);
router.post('/create-cart', cartController.createCart);
router.put('/update-cart', cartController.updateCart);
router.delete('/delete-cart/:id', cartController.deleteCart);

module.exports = router;