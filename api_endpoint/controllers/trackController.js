const HttpStatus = require('http-status-codes');
const { apiQueries } = require('../models')

exports.getTrack = async (req, res) => {
    try {
        const spotifyId = req.query.spotifyId;
        const geniusId = req.query.geniusId;
        const name = req.query.name;

        const spotifyData = await apiQueries.trackApiQueries.getTrack(name, spotifyId,'Spotify');
        const geniusData = await apiQueries.trackApiQueries.getTrack(name, geniusId,'Genius');

        let data = {};
        data.spotify = spotifyData;
        data.genius = geniusData;

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

exports.getTrackAudioAnalysis = async (req, res) => {
    try {
        const id = req.query.id;
        const data = await apiQueries.trackApiQueries.getTrackAudioAnalysis(id);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get track audio analysis -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.getTrackAudioFeatures = async (req, res) => {
    try {
        const id = req.query.id;
        const data = await apiQueries.trackApiQueries.getTrackAudioFeatures(id);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get track audio features -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};