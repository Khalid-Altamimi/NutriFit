const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');
const isSignedIn = require('../middleware/is-signed-in');

router.use(isSignedIn);

router.get('/', cartController.index);


router.post('/add', cartController.add);


router.post('/remove', cartController.remove);


module.exports = router;


