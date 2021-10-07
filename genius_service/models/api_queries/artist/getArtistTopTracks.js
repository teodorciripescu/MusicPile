const axios = require('axios');

async function run(id){
    return new Promise(async resolve => {
        axios.get(encodeURI(`https://api.genius.com/artists/${id}/songs?sort=popularity&per_page=10`))
            .then(function (response) {
                const resp = response.data;
                if(resp.meta.status === 200){
                    let tracks = resp.response.songs;
                    tracks.forEach(function(t){ delete t.primary_artist });
                    resolve(tracks);
                } else{
                    resolve(resp.meta);
                }
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });

    });
}
module.exports = async function(id){
    const resp = await run(id);
    return resp;
}

