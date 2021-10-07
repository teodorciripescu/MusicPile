const {albums} = require('../schemas')

module.exports = async function(album){
    var res;
    try {
        album = new albums(album);
        res = await album.save();
    } catch(err){
        res = err;
    }

    return res;
}