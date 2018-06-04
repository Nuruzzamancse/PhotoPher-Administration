var express = require('express'),
    router = express.Router(),
    recruiterController = require('../controller/recruiter');

router.post('/', recruiterController.createRecruiter);
router.get('/:id', recruiterController.getSingleRecruiter);
router.get('/', recruiterController.getAllRecruiter);
router.patch('/:id', recruiterController.updateRecruiter);
router.delete('/:id', recruiterController.deleteRecruiter);

module.exports = router;
