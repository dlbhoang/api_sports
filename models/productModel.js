const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    },

    create: (product, callback) => {
        const query = 'INSERT INTO products SET ?';
        db.query(query, product, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, { id: results.insertId, ...product });
        });
    },

    update: (id, product, callback) => {
        const query = 'UPDATE products SET ? WHERE id = ?';
        db.query(query, [product, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, { id, ...product });
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Product;
