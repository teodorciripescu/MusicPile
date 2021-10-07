const router = require('express').Router();
const HttpStatus = require('http-status-codes');

// const users = require('./users');
const artist = require('./artist');
const album = require('./album');
const track = require('./track');

router.get('/', (req, res) => {
    return res.status(HttpStatus.OK).json({
        status: 'active',
    });
});

// router.use('/users', users);
router.use('/artist', artist);
router.use('/album', album);
router.use('/track', track);

module.exports = router;