let express = require('express'),
    router = express.Router(),
    cartController = require('../controller/cart'),
    authController = require('../controller/auth');

router.get('/:photographerId', authController.photographerAuthenticate, cartController.getCart);
router.get('/:photographerId/:photoId', authController.photographerAuthenticate, cartController.removePhoto);

module.exports = router;