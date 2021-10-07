const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracksAudioFeaturesSchema = new Schema(
    {
        "danceability": {
            "type": "Number"
        },
        "energy": {
            "type": "Number"
        },
        "key": {
            "type": "Number"
        },
        "loudness": {
            "type": "Number"
        },
        "mode": {
            "type": "Number"
        },
        "speechiness": {
            "type": "Number"
        },
        "acousticness": {
            "type": "Number"
        },
        "instrumentalness": {
            "type": "Number"
        },
        "liveness": {
            "type": "Number"
        },
        "valence": {
            "type": "Number"
        },
        "tempo": {
            "type": "Number"
        },
        "type": {
            "type": "String"
        },
        "id": {
            "type": "String"
        },
        "uri": {
            "type": "String"
        },
        "track_href": {
            "type": "String"
        },
        "analysis_url": {
            "type": "String"
        },
        "duration_ms": {
            "type": "Number"
        },
        "time_signature": {
            "type": "Number"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const tracks = mongoose.model('tracks_audio_features', TracksAudioFeaturesSchema);

module.exports = tracks;