const {tracks} = require('../schemas')

module.exports = async function(track){
    var res;
    try {
        track = new tracks(track);
        res = await track.save();
    } catch(err){
        res = err;
    }

    return res;
}