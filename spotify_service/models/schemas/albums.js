const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumsSchema = new Schema(
    {
        "album_type": {
            "type": "String"
        },
        "artists": {
            "type": [
                "Mixed"
            ]
        },
        "available_markets": {
            "type": [
                "String"
            ]
        },
        "copyrights": {
            "type": [
                "Mixed"
            ]
        },
        "external_ids": {
            "upc": {
                "type": "String"
            }
        },
        "external_urls": {
            "spotify": {
                "type": "String"
            }
        },
        "genres": {
            "type": [
                "String"
            ]
        },
        "href": {
            "type": "String"
        },
        "id": {
            "type": "String"
        },
        "images": {
            "type": [
                "Mixed"
            ]
        },
        "label": {
            "type": "String"
        },
        "name": {
            "type": "String"
        },
        "popularity": {
            "type": "Number"
        },
        "release_date": {
            "type": "Date"
        },
        "release_date_precision": {
            "type": "String"
        },
        "total_tracks": {
            "type": "Number"
        },
        "tracks": {
            "href": {
                "type": "String"
            },
            "items": {
                "type": [
                    "Mixed"
                ]
            },
            "limit": {
                "type": "Number"
            },
            "next": {
                "type": "Mixed"
            },
            "offset": {
                "type": "Number"
            },
            "previous": {
                "type": "Mixed"
            },
            "total": {
                "type": "Number"
            }
        },
        "type": {
            "type": "String"
        },
        "uri": {
            "type": "String"
        },
        "page": {
            "type": "Number"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const topAlbums = mongoose.model('albums', AlbumsSchema);

module.exports = topAlbums;