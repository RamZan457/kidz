// routes/checkoutRoutes.js

const express = require('express');
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post('/create-checkout-session', checkoutController.createCheckout);


module.exports = router;