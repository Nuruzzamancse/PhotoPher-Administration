var express = require('express'),
    router = express.Router(),
    authController = require('../controller/auth'),
    photoController = require('../controller/photo');

router.get('/album/:albumId', photoController.getPhotoOfAlbum);
router.get('/public', photoController.getPublicPhoto);
router.get('/search/:searchKeyword', photoController.searchPhoto);
router.get('/photographerAllPhotos/:photographerId', authController.photographerAuthenticate, photoController.getAllPhotosOfPhotographer);

router.post('/upload/:id',  photoController.createPhoto);
router.get('/', authController.adminAuthenticate, photoController.getAllPhoto);
router.get('/private/:photoId', authController.photographerAuthenticate, photoController.getSinglePrivatePhoto);
router.get('/public/:photoId', photoController.getSinglePublicPhoto);
router.patch('/:photoId', authController.photographerAuthenticate, photoController.updatePhoto);
router.delete('/:photoId', authController.photographerAuthenticate, photoController.deletePhoto);

module.exports = router;
