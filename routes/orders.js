const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const isSignedIn = require('../middleware/is-signed-in');

router.use(isSignedIn);

router.get('/checkout', ordersController.newCheckout); 

router.post('/', ordersController.createOrder);

router.get('/:id', ordersController.show); 



module.exports = router;