const {all_artists} = require('../schemas')

module.exports = async function(artist){
    var res;
    try {
        artist = new all_artists(artist);
        res = await artist.save();
    } catch(err){
        res = err;
    }

    return res;
}