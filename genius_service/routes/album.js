const router = require('express').Router();
const { albumController } = require('../controllers');

router.get('/', albumController.getAlbum);
router.get('/tracks', albumController.getAlbumTracks);

module.exports = router;