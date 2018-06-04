let express = require('express'),
    router = express.Router(),
    cartController = require('../controller/cart'),
    authController = require('../controller/auth');

router.get('/:photographerId', authController.photographerAuthenticate, cartController.getCart);
router.get('/buyList/:photographerId', authController.photographerAuthenticate, cartController.getBuyList);
router.get('/wishlist/:photographerId/:photoId', authController.photographerAuthenticate, cartController.removePhoto);
router.get('/buyList/:photographerId/:photoId', authController.photographerAuthenticate, cartController.passToBuyList);

module.exports = router;