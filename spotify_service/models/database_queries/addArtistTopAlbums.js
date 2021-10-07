const {top_albums} = require('../schemas')

module.exports = async function(topAlbums){
    var res;
    try {
        topAlbums = new top_albums(topAlbums);
        res = await topAlbums.save();
    } catch(err){
        res = err;
    }

    return res;
}