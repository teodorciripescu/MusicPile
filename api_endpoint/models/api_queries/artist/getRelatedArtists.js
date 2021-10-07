const axios = require('axios');

async function run(id){
    let url = encodeURI(`http://localhost:3500/api/artist/related?id=${id}`);

    return new Promise(async resolve => {
        axios.get(url)
            .then(async function (response) {
                let spotifyRelatedArtists = response.data.data;
                resolve(spotifyRelatedArtists);
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });
    });
}
module.exports = async function(id){
    let resp = await run(id);
    if(!resp){
        resp = {
            message: `Related artists not found.`
        }
    }
    return resp;
}

