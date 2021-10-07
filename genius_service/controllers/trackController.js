const HttpStatus = require('http-status-codes');
const { apiQueries } = require('../models')

exports.getTrack = async (req, res) => {
    try {
        const id = req.query.id;
        const name = req.query.name;
        var data;

        if(id){
            data = await apiQueries.trackApiQueries.getTrack(id);
        } else if(name){
            data = await apiQueries.trackApiQueries.getTrackByName(name);
        } else{
            data = null;
        }
        return res.status(HttpStatus.OK).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(`Unable get track -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};