var express = require('express'),
    router = express.Router(),
    superAdminController = require('../controller/superAdmin');

router.post('/', superAdminController.createSuperAdmin);
router.get('/:id', superAdminController.getSingleSuperAdmin);
router.get('/', superAdminController.getAllSuperAdmin);
router.patch('/:id', superAdminController.updateSuperAdmin);
router.delete('/:id', superAdminController.deleteSuperAdmin);

module.exports = router;
