const {top_tracks} = require('../schemas')

module.exports = async function (artist) {
    const res = await top_tracks.findOneAndUpdate({id: artist.id},
        artist, {new: true, useFindAndModify: false});
    return res;
}