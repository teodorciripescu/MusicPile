const HttpStatus = require('http-status-codes');
const {databaseQueries} = require('../models')

exports.getTop50TracksByDate = async (req, res) => {
    try {
        const date = req.query.date;
        let data;

        if(date){
            data = await databaseQueries.getTop50TracksByDate(date);
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