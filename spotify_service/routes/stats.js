const router = require('express').Router();
const { statsController } = require('../controllers');

router.get('/top50global', statsController.getTop50TracksByDate);

module.exports = router;