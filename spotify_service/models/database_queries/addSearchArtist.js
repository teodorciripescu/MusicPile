const {search_artists} = require('../schemas')

module.exports = async function(artists){
    var res;
    try {
        artists = new search_artists(artists);
        res = await artists.save();
    } catch(err){
        res = err;
    }

    return res;
}