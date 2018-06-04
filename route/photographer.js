var express = require('express'),
    router = express.Router(),
    photographerController = require('../controller/photographer'),
    authController = require('../controller/auth');

router.get('/photographerPrivateInformation/:photographerId', authController.photographerAuthenticate, photographerController.photographerPrivateInformation);

router.get('/:photographerId', photographerController.getSinglePhotographer);
router.patch('/:photographerId', authController.photographerAuthenticate, photographerController.updatePhotographer);
router.delete('/:photographerId', authController.adminAuthenticate, photographerController.deletePhotographer);
router.post('/', photographerController.createPhotographer);
router.get('/', photographerController.getAllPhotographer);

module.exports = router;
