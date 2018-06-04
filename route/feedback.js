let express = require('express'),
    router = express.Router(),
    feedbackController = require('../controller/feedback'),
    authController = require('../controller/auth');

router.post('/', feedbackController.createFeedback);
router.get('/:feedbackId', authController.adminAuthenticate, feedbackController.getSingleFeedback);
router.get('/', authController.adminAuthenticate, feedbackController.getAllFeedback);
router.patch('/:feedbackId', authController.adminAuthenticate, feedbackController.updateFeedback);
router.delete('/:feedbackId', authController.adminAuthenticate, feedbackController.deleteFeedback);

module.exports = router;