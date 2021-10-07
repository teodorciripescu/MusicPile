const router = require('express').Router();
const { trackController } = require('../controllers');

router.get('/', trackController.getTrack);

module.exports = router;