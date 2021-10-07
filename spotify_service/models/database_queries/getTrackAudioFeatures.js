const {tracks_audio_features} = require('../schemas');

module.exports = async function(id){
    var data;
    try {
        data = await tracks_audio_features.find({id: id},'-_id');
        data = data[0];
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}