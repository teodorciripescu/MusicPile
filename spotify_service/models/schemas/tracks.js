const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracksSchema = new Schema(
    {
        "album": {
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
            "external_urls": {
                "spotify": {
                    "type": "String"
                }
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
            "name": {
                "type": "String"
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
            "type": {
                "type": "String"
            },
            "uri": {
                "type": "String"
            }
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
        "disc_number": {
            "type": "Number"
        },
        "duration_ms": {
            "type": "Number"
        },
        "explicit": {
            "type": "Boolean"
        },
        "external_ids": {
            "isrc": {
                "type": "String"
            }
        },
        "external_urls": {
            "spotify": {
                "type": "String"
            }
        },
        "href": {
            "type": "String"
        },
        "id": {
            "type": "String"
        },
        "is_local": {
            "type": "Boolean"
        },
        "name": {
            "type": "String"
        },
        "popularity": {
            "type": "Number"
        },
        "preview_url": {
            "type": "String"
        },
        "track_number": {
            "type": "Number"
        },
        "type": {
            "type": "String"
        },
        "uri": {
            "type": "String"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const tracks = mongoose.model('tracks', TracksSchema);

module.exports = tracks;