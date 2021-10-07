const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracksSchema = new Schema(
    {
        "annotation_count": {
            "type": "Number"
        },
        "api_path": {
            "type": "String"
        },
        "apple_music_id": {
            "type": "String"
        },
        "apple_music_player_url": {
            "type": "String"
        },
        "description": {
            "plain": {
                "type": "String"
            }
        },
        "embed_content": {
            "type": "String"
        },
        "featured_video": {
            "type": "Boolean"
        },
        "full_title": {
            "type": "String"
        },
        "header_image_thumbnail_url": {
            "type": "String"
        },
        "header_image_url": {
            "type": "String"
        },
        "id": {
            "type": "Number"
        },
        "lyrics_owner_id": {
            "type": "Number"
        },
        "lyrics_placeholder_reason": {
            "type": "Mixed"
        },
        "lyrics_state": {
            "type": "String"
        },
        "path": {
            "type": "String"
        },
        "pyongs_count": {
            "type": "Number"
        },
        "recording_location": {
            "type": "Mixed"
        },
        "release_date": {
            "type": "Date"
        },
        "release_date_for_display": {
            "type": "Date"
        },
        "song_art_image_thumbnail_url": {
            "type": "String"
        },
        "song_art_image_url": {
            "type": "String"
        },
        "stats": {
            "accepted_annotations": {
                "type": "Number"
            },
            "contributors": {
                "type": "Number"
            },
            "iq_earners": {
                "type": "Number"
            },
            "transcribers": {
                "type": "Number"
            },
            "unreviewed_annotations": {
                "type": "Number"
            },
            "verified_annotations": {
                "type": "Number"
            },
            "concurrents": {
                "type": "Number"
            },
            "hot": {
                "type": "Boolean"
            },
            "pageviews": {
                "type": "Number"
            }
        },
        "title": {
            "type": "String"
        },
        "title_with_featured": {
            "type": "String"
        },
        "url": {
            "type": "String"
        },
        "song_art_primary_color": {
            "type": "String"
        },
        "song_art_secondary_color": {
            "type": "String"
        },
        "song_art_text_color": {
            "type": "String"
        },
        "album": {
            "api_path": {
                "type": "String"
            },
            "cover_art_url": {
                "type": "String"
            },
            "full_title": {
                "type": "String"
            },
            "id": {
                "type": "Number"
            },
            "name": {
                "type": "String"
            },
            "url": {
                "type": "String"
            },
            "artist": {
                "api_path": {
                    "type": "String"
                },
                "header_image_url": {
                    "type": "String"
                },
                "id": {
                    "type": "Number"
                },
                "image_url": {
                    "type": "String"
                },
                "is_meme_verified": {
                    "type": "Boolean"
                },
                "is_verified": {
                    "type": "Boolean"
                },
                "name": {
                    "type": "String"
                },
                "url": {
                    "type": "String"
                },
                "iq": {
                    "type": "Number"
                }
            }
        },
        "featured_artists": {
            "type": "Array"
        },
        "lyrics_marked_complete_by": {
            "type": "Mixed"
        },
        "media": {
            "type": [
                "Mixed"
            ]
        },
        "primary_artist": {
            "api_path": {
                "type": "String"
            },
            "header_image_url": {
                "type": "String"
            },
            "id": {
                "type": "Number"
            },
            "image_url": {
                "type": "String"
            },
            "is_meme_verified": {
                "type": "Boolean"
            },
            "is_verified": {
                "type": "Boolean"
            },
            "name": {
                "type": "String"
            },
            "url": {
                "type": "String"
            },
            "iq": {
                "type": "Number"
            }
        },
        "producer_artists": {
            "type": [
                "Mixed"
            ]
        },
        "writer_artists": {
            "type": [
                "Mixed"
            ]
        },
        "search_query":{
            "type": "String"
        }
    }
    ,
    {
        versionKey: false,
        timestamps: true
    }
);

const tracks = mongoose.model('tracks', TracksSchema);

module.exports = tracks;