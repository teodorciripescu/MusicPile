const router = require('express').Router();
const { trackController } = require('../controllers');

router.get('/', trackController.getTrack);
router.get('/audio_analysis', trackController.getTrackAudioAnalysis);
router.get('/audio_features', trackController.getTrackAudioFeatures);

module.exports = router;