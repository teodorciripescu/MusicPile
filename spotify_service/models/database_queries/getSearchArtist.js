const {search_artists} = require('../schemas')

module.exports = async function(name){
    var data;
    try {
        data = await search_artists.find({name: name},'-_id');
        data = data[0];
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}