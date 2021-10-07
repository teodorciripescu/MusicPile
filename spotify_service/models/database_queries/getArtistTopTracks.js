const {top_tracks} = require('../schemas')

module.exports = async function(id){
    var data;
    try {
        data = await top_tracks.find({id: id},'-_id');
        data = data[0];
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}