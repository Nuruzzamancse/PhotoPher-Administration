let express = require('express'),
    router = express.Router(),
    clientController = require('../controller/client');

router.get('/', clientController.createClient);

module.exports = router;