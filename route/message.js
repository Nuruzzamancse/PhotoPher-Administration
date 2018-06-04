let express = require('express'),
    router = express.Router(),
    messageController = require('../controller/message'),
    authController = require('../controller/auth');

router.get('/photographer/all/:photographerId', authController.photographerAuthenticate, messageController.photographersAllMessage);
router.get('/photographer/read/:photographerId', authController.photographerAuthenticate, messageController.photographersReadMessage);
router.get('/photographer/unread/:photographerId', authController.photographerAuthenticate, messageController.photographersUnReadMessage);

router.post('/', messageController.createMessage);
router.get('/:messageId', authController.photographerAuthenticate, messageController.getSingleMessage);
router.get('/', authController.adminAuthenticate, messageController.getAllMessage);
router.patch('/:messageId', authController.adminAuthenticate, messageController.updateMessage);
router.delete('/:messageId', authController.photographerAuthenticate, messageController.deleteMessage);

module.exports = router;