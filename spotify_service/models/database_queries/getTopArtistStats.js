const {top_artists} = require('../schemas')

module.exports = async function(id){
    var data;
    try {
        data = await top_artists.find({id: id},'-_id').sort({"date": 1});
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}