let express = require('express'),
    router = express.Router(),
    categoryController = require('../controller/category'),
    authController = require('../controller/auth');

router.post('/', authController.photographerAuthenticate, categoryController.createCategory);
router.get('/:categoryId', categoryController.getSingleCategory);
router.get('/', categoryController.getAllCategory);
router.patch('/:categoryId', authController.adminAuthenticate, categoryController.updateCategory);
router.delete('/:categoryId', authController.adminAuthenticate, categoryController.deleteCategory);

module.exports = router;