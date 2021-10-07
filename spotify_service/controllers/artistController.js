const HttpStatus = require('http-status-codes');
const {apiQueries} = require('../models')
exports.getArtist = async (req, res) => {
    try {
        const id = req.query.id;
        const name = req.query.name;
        var data;

        if(id){
            data = await apiQueries.artistApiQueries.getArtist(id);
        } else if(name){
            data = await apiQueries.artistApiQueries.getArtistByName(name);
        } else{
            data = null;
        }

        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get artist -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.getArtistTopTracks = async (req, res) => {
    try {
        // const users = await req.db.User.find({});
        const id = req.query.id;
        const country = req.query.country;
        const data = await apiQueries.artistApiQueries.getArtistTopTracks(id, country);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get artist top tracks -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.getArtistAlbums = async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const data = await apiQueries.artistApiQueries.getArtistAlbums(id, page);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get artist albums -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.getRelatedArtists = async (req, res) => {
    try {
        const id = req.query.id;
        const data = await apiQueries.artistApiQueries.getRelatedArtists(id);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get related artists -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

exports.searchArtists = async (req, res) => {
    try {
        const name = req.query.name;
        const data = await apiQueries.artistApiQueries.searchArtists(name);
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get any artists -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};