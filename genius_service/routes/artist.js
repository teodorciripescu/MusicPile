const router = require('express').Router();
const { artistController } = require('../controllers');

router.get('/', artistController.getArtist);
router.get('/top_tracks', artistController.getArtistTopTracks);
router.get('/albums', artistController.getArtistAlbums);

module.exports = router;