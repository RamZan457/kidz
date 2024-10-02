const { encodeKey, decodeKey } = require('../Utils/generateEncoded');
const Cart = require('../models/Cart ');

// Get all carts
exports.getCarts = async (req, res) => {
    try {
        const data = req.body;
        if (data) {
            var cartKey = data.cartKey;
            var cart = await Cart.findOne({ cartKey: cartKey });
            if (!cart || cart.length == 0) {
                console.log("No Cart Found");
                cart = {
                    totalAmount: 0,
                    items: []
                }
            }
            return res.json(cart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCart = async (req, res) => {
    const { items, totalAmount, cartKey } = req.body;

    if (!items || !totalAmount) {
        return res.status(400).json({ message: 'Items and total amount are required' });
    }

    await Cart.findOneAndDelete({ cartKey: cartKey });
    const cart = new Cart({
        items,
        cartKey,
        totalAmount,
    });

    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        await cart.remove();
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateCart = async (req, res) => {
    const { items, totalAmount, cartKey } = req.body.data;
    if (!items || !totalAmount || !cartKey) {
        return res.status(400).json({ message: 'Items, total amount and cart key are required' });
    }
    try {
        const cart = await Cart.findOneAndUpdate({ cartKey: cartKey }, { items, totalAmount, cartKey }, { new: true });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}