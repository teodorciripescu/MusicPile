const {search_artists} = require('../schemas')

module.exports = async function (artists) {
    const res = await search_artists.findOneAndUpdate({name: artists.name},
        artists, {new: true, useFindAndModify: false});
    return res;
}