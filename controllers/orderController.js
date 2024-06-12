const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const createOrder = (req, res) => {
    const { userId, totalAmount } = req.body;
    Order.create(userId, totalAmount, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        Cart.clearCart(userId, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: 'Order created successfully', orderId: results.orderId });
        });
    });
};

const getOrdersByUserId = (req, res) => {
    const { userId } = req.params;
    Order.getByUserId(userId, (err, orders) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(orders);
    });
};

module.exports = {
    createOrder,
    getOrdersByUserId
};
