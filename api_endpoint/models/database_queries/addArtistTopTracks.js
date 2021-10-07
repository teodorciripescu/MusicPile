const {top_tracks} = require('../schemas')

module.exports = async function(topTracks){
    var res;
    try {
        topTracks = new top_tracks(topTracks);
        res = await topTracks.save();
    } catch(err){
        res = err;
    }

    return res;
}