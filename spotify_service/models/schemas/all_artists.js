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
        },
        "image": {
            "type": "string"
        },
        "stats": {
            "type": [
                "Mixed"
            ]
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const artists = mongoose.model('all_artists', ArtistsSchema);

module.exports = artists;