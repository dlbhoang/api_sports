const Product = require('../models/productModel');

const getAllProducts = (req, res) => {
    Product.getAll((err, products) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(products);
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(product);
    });
};

const createProduct = (req, res) => {
    const newProduct = req.body;
    Product.create(newProduct, (err, product) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(product);
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    Product.update(id, updatedProduct, (err, product) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(product);
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Product deleted');
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
