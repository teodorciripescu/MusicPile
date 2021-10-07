const {tracks} = require('../schemas')

module.exports = async function (artist) {
    const res = await tracks.findOneAndUpdate({id: artist.id},
        artist, {new: true, useFindAndModify: false});
    return res;
}