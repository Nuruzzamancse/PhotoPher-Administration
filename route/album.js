let express = require('express'),
    router = express.Router(),
    albumController = require('../controller/album'),
    authController = require('../controller/auth');

router.get('/public', albumController.getPublicAlbums);
router.get('/category/:categoryId', albumController.getCategorizedAlbums);
router.get('/photographer/:photographerId', authController.photographerAuthenticate, albumController.getPhotographerAlbum);
router.get('/publicAlbumsInfo', albumController.getPublicAlbumsInfo);
router.get('/photographersPublicAlbumsInfo/:photographerId', albumController.getPhotographerPublicAlbumsInfo);
router.get('/photographerAllAlbum/:photographerId', authController.photographerAuthenticate, albumController.getPhotographerAllAlbum);


router.post('/', authController.photographerAuthenticate, albumController.createAlbum);
router.get('/:albumId', albumController.getSingleAlbum);
router.get('/privateAlbum/:albumId', authController.photographerAuthenticate, albumController.getSinglePrivateAlbum);
router.get('/', authController.adminAuthenticate, albumController.getAlbums);
router.patch('/:albumId', authController.photographerAuthenticate, albumController.updateAlbum);
router.delete('/:albumId', authController.photographerAuthenticate, albumController.deleteAlbum);



module.exports = router;