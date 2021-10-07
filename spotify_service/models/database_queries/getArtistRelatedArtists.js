const {related_artists} = require('../schemas')

module.exports = async function(id){
    var data;
    try {
        data = await related_artists.find({id: id},'-_id');
        data = data[0];
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}