const {albums} = require('../schemas')

module.exports = async function(id, page){
    var data;
    try {
        data = await albums.find({id: id, page: page},'-_id');
        data = data[0];
    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}