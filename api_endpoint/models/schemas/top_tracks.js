const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopTracksSchema = new Schema(
    {
        "name": {
            "type": "string"
        },
        "id": {
            "type": "String"
        },
        "tracks": {
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

const topTracks = mongoose.model('top_tracks', TopTracksSchema);

module.exports = topTracks;