const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopAlbumsSchema = new Schema(
    {
        "id": {
            "type": "String"
        },
        "page": {
            "type": "Number"
        },
        "albums": {
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

const topAlbums = mongoose.model('top_albums', TopAlbumsSchema);

module.exports = topAlbums;