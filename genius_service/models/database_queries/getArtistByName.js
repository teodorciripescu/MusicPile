const {all_artists} = require('../schemas');

module.exports = async function(name){
    var data;
    try {
        name = name.trim();
        var regex = new RegExp(["^", name, "$"].join(""), "i");
        data = await all_artists.find({name: regex},'-_id');
        data = data[0];

    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}