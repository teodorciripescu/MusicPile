const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelatedArtistsSchema = new Schema(
    {
        "id": {
            "type": "String"
        },
        "artists": {
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

const relatedArtists = mongoose.model('related_artists', RelatedArtistsSchema);

module.exports = relatedArtists;