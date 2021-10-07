const {tracks} = require('../schemas')

module.exports = async function (track) {
    const res = await tracks.findOneAndUpdate({id: track.id},
        track, {new: true, useFindAndModify: false});
    return res;
}