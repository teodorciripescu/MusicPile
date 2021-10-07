const {albums} = require('../schemas')

module.exports = async function (album, page) {
    const res = await albums.findOneAndUpdate({id: album.id, page: page},
        album, {new: true, useFindAndModify: false});
    return res;
}