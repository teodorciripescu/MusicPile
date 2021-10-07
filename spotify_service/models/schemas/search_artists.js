const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchArtistsSchema = new Schema(
    {
        "artists": {
            "type": [
                "Mixed"
            ]
        },
        "name": {
            "type": "String"
        }
    },
    {
        versionKey: false
    }
);

const searchArtists = mongoose.model('search_artists', SearchArtistsSchema);

module.exports = searchArtists;