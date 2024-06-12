const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne(email);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error finding user or comparing passwords:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    register,
    login
};
