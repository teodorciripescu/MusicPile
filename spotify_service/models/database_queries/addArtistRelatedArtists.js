const {related_artists} = require('../schemas')

module.exports = async function(relatedArtists){
    var res;
    try {
        relatedArtists = new related_artists(relatedArtists);
        res = await relatedArtists.save();
    } catch(err){
        res = err;
    }

    return res;
}