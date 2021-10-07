const {all_artists} = require('../schemas')

module.exports = async function (artist) {
    const res = await all_artists.findOneAndUpdate({id: artist.id},
        artist, {new: true, useFindAndModify: false});
    return res;
}