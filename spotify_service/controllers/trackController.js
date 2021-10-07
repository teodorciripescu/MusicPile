const HttpStatus = require('http-status-codes');
const { apiQueries } = require('../models')

exports.getTrack = async (req, res) => {
    try {
        const id = req.query.id;
        const data = await apiQueries.trackApiQueries.getTrack(id);
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