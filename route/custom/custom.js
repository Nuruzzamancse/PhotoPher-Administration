let express = require('express'),
    router = express.Router(),
    customController = require('../../controller/custom');

router.get('/propertiesLength', customController.getLengthOfProperty);
router.get('/photographerRoyality/:photoId', customController.addPhotographerRoyality);

module.exports = router;