// controllers/checkoutController.js

const Cart = require('../models/Cart ');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

exports.createCheckout = async (req, res) => {
    try {
        const cartKey = req.body.cartKey;
        const cart = await Cart.findOne({ cartKey: cartKey });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Prepare line items for Stripe checkout
        const lineItems = cart.items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.description,
                    images: [item.image],
                    metadata: {
                        id: item.id,
                        color: item.color,
                        size: item.size,
                    }
                },
                unit_amount: item.perPiecePrice * 100,
            },
            quantity: item.quantity,
        }));

        // Add discount if applicable
        if (cart.totalDiscount > 0) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Discount',
                        description: 'Total discount applied to the cart',
                    },
                    unit_amount: -(cart.totalDiscount * 100),
                },
                quantity: 1,
            });
        }

        // Add delivery tax as a separate line item
        if (cart.deliveryTax > 0) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Tax',
                        description: 'Additional delivery fee',
                    },
                    unit_amount: cart.deliveryTax * 100,
                },
                quantity: 1,
            });
        }

        // Log the final lineItems for review
        // console.log("Line Items for Stripe Checkout: ", JSON.stringify(lineItems, null, 2));

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: 'http://localhost:5173/checkout/success',
            cancel_url: 'http://localhost:5173/checkout/failed',
        });
        // success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session: ", error.message);
        res.status(500).json({ message: error.message });
    }
};