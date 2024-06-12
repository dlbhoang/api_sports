const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);
router.get('/:userId', cartController.getCartItems);
router.delete('/remove/:userId/:productId', cartController.removeItemFromCart);
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
