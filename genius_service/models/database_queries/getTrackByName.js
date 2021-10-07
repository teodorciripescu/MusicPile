const {tracks} = require('../schemas');

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

module.exports = async function(name){
    var data;
    try {
        name = name.trim();
        var regex = new RegExp(["^", escapeRegex(name), "$"].join(""), "i");
        data = await tracks.find({search_query: regex},'-_id');
        data = data[0];

    } catch (err) {
        console.log(err);
        data = null;
    }
    return data;
}