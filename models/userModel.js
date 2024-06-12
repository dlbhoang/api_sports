const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (user) => {
        const { email, password } = user;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object with hashed password
        const newUser = {
            email: email,
            password: hashedPassword
        };

        // Insert into database
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users SET ?';
            db.query(query, newUser, (err, results) => {
                if (err) {
                    reject(err);
                }
                newUser.id = results.insertId;
                resolve(newUser);
            });
        });
    },

    findOne: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                }
                if (results.length === 0) {
                    resolve(null); // User not found
                }
                const user = results[0];
                resolve(user);
            });
        });
    }
};

module.exports = User;
