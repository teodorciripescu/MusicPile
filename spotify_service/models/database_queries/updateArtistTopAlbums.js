const {top_albums} = require('../schemas')

module.exports = async function (topAlbums, page) {
    const res = await top_albums.findOneAndUpdate({id: topAlbums.id, page:page},
        topAlbums, {new: true, useFindAndModify: false});
    return res;
}