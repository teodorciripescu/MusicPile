const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Top50SongsSchema = new Schema(
    {
        "date": {
            "type": "date"
        },
        "tracks": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "release_date": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "popularity": {
                        "type": "number"
                    },
                    "artists": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "id": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        versionKey: false
    }
);

const top50songs = mongoose.model('top50songs', Top50SongsSchema);

module.exports = top50songs;