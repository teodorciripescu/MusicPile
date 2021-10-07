const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistsSchema = new Schema(
    {
        "alternate_names": {
            "type": [
                "String"
            ]
        },
        "api_path": {
            "type": "String"
        },
        "description": {
            "plain": {
                "type": "String"
            }
        },
        "facebook_name": {
            "type": "String"
        },
        "followers_count": {
            "type": "Number"
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
        "instagram_name": {
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
        "translation_artist": {
            "type": "Boolean"
        },
        "twitter_name": {
            "type": "String"
        },
        "url": {
            "type": "String"
        },
        "iq": {
            "type": "Number"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const artists = mongoose.model('all_artists', ArtistsSchema);

module.exports = artists;