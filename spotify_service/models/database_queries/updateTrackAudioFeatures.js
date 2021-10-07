const {tracks_audio_features} = require('../schemas')

module.exports = async function (trackAudioFeatures) {
    const res = await tracks_audio_features.findOneAndUpdate({id: trackAudioFeatures.id},
        trackAudioFeatures, {new: true, useFindAndModify: false});
    return res;
}