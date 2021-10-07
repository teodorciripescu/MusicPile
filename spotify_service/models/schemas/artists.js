const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistsSchema = new Schema(
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
        }
    },
    {
        versionKey: false
    }
);

const artists = mongoose.model('artists', ArtistsSchema);

module.exports = artists;