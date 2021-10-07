const axios = require('axios');

async function run(id, page){
    let url = `http://localhost:3500/api/artist/albums?id=${id}&page=${page}`;
    url = encodeURI(url);
    return new Promise(async resolve => {
        axios.get(url)
            .then(async function (response) {
                let spotifyTopAlbums = response.data.data;
                resolve(spotifyTopAlbums);
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });
    });
}

module.exports = async function(id, page){
    let resp = await run(id, page);
    if(!resp){
        resp = {
            message: `Albums not found.`
        }
    }
    return resp;
}

