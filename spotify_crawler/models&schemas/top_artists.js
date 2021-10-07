const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopArtistsSchema = new Schema(
    {
        "name": {
            "type": "string"
        },
        "id": {
            "type": "string"
        },
        "genres": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "followers": {
            "type": "number"
        },
        "popularity": {
            "type": "number"
        },
        "date": {
            "type": "date"
        }
    },
    {
        versionKey: false
    }
);

const top_artists = mongoose.model('top_artists', TopArtistsSchema);

module.exports = top_artists;