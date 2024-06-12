const db = require('../config/db');

const Order = {
    create: (userId, totalAmount, callback) => {
        const query = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
        db.query(query, [userId, totalAmount], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const orderId = results.insertId;
            const orderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) SELECT ?, product_id, quantity, price FROM cart JOIN products ON cart.product_id = products.id WHERE user_id = ?';
            db.query(orderItemsQuery, [orderId, userId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, { orderId, ...results });
            });
        });
    },

    getByUserId: (userId, callback) => {
        const query = 'SELECT * FROM orders WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Order;
