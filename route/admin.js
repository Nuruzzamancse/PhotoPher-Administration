var express = require('express'),
    router = express.Router(),
    adminController = require('../controller/admin');

router.post('/', adminController.createAdmin);
router.get('/:id', adminController.getSingleAdmin);
router.get('/', adminController.getAllAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
