const {tracks_audio_features} = require('../schemas')

module.exports = async function(trackAudioFeatures){
    var res;
    try {
        trackAudioFeatures = new tracks_audio_features(trackAudioFeatures);
        res = await trackAudioFeatures.save();
    } catch(err){
        res = err;
    }

    return res;
}