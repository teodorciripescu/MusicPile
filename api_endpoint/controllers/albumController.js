const HttpStatus = require('http-status-codes');
const { apiQueries } = require('../models')

exports.getAlbum = async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const data = await apiQueries.albumApiQueries.getAlbum(id, page);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get album -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.getAlbumTracks = async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const data = await apiQueries.albumApiQueries.getAlbumTracks(id, page);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get album -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};