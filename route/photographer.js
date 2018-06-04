var express = require('express'),
    router = express.Router(),
    photographerController = require('../controller/photographer'),
    authController = require('../controller/auth');

router.get('/photographerPrivateInformation/:photographerId', authController.photographerAuthenticate, photographerController.photographerPrivateInformation);

router.post('/', photographerController.createPhotographer);
router.get('/:photographerId', photographerController.getSinglePhotographer);
router.get('/', photographerController.getAllPhotographer);
router.patch('/:photographerId', authController.photographerAuthenticate, photographerController.updatePhotographer);
router.delete('/:photographerId', authController.adminAuthenticate, photographerController.deletePhotographer);

module.exports = router;
