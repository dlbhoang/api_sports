const db = require('../config/db');

const Cart = {
    addItem: (userId, productId, quantity, callback) => {
        const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)';
        db.query(query, [userId, productId, quantity], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getItems: (userId, callback) => {
        const query = 'SELECT c.id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    removeItem: (userId, productId, callback) => {
        const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
        db.query(query, [userId, productId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    clearCart: (userId, callback) => {
        const query = 'DELETE FROM cart WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Cart;
