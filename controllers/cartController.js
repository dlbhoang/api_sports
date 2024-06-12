const Cart = require('../models/cartModel');

const addItemToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;
    Cart.addItem(userId, productId, quantity, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Item added to cart successfully' });
    });
};

const getCartItems = (req, res) => {
    const { userId } = req.params;
    Cart.getItems(userId, (err, items) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(items);
    });
};

const removeItemFromCart = (req, res) => {
    const { userId, productId } = req.params;
    Cart.removeItem(userId, productId, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Item removed from cart successfully' });
    });
};

const clearCart = (req, res) => {
    const { userId } = req.params;
    Cart.clearCart(userId, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Cart cleared successfully' });
    });
};

module.exports = {
    addItemToCart,
    getCartItems,
    removeItemFromCart,
    clearCart
};
