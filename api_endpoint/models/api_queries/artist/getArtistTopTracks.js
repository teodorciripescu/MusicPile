const axios = require('axios');
const databaseQueries = require("../../database_queries");

async function run(id){
    let url = encodeURI(`http://localhost:3500/api/artist/top_tracks?id=${id}&country=RO`);

    return new Promise(async resolve => {
        axios.get(url)
            .then(async function (response) {
                let spotifyTopTracks = response.data.data;
                // search on genius
                // console.log(spotifyTopTracks)
                let geniusTracks = await searchTracksOnGenius(spotifyTopTracks);
                geniusTracks = geniusTracks.map(value => {
                    return {media: value.media, id: value.id, title: value.title}
                })
                let res = {tracks:[]};
                res.id = id;
                res.name = spotifyTopTracks.name;

                spotifyTopTracks = spotifyTopTracks.tracks;
                for (let i = 0; i < spotifyTopTracks.length; i++) {
                    if(geniusTracks[i].id){
                        res.tracks.push({
                           spotify: spotifyTopTracks[i],
                            genius: geniusTracks[i]
                        });
                    } else{
                        res.tracks.push({
                            spotify: spotifyTopTracks[i],
                            genius: null
                        });
                    }
                }
                resolve(res);

            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });
    });
}

async function searchTracksOnGenius(topTracks){
    var promises = [];
    for (let i = 0; i < topTracks.tracks.length; i++) {
        const query = `${topTracks.name} ${topTracks.tracks[i].name}`;
        promises.push(new Promise(resolve => {
            axios.get(encodeURI(`http://localhost:4500/api/track?name=${query}`))
                .then(function (response) {
                    const resp = response.data;
                    resolve(resp.data);
                })
                .catch(function (error) {
                    console.log('search genius tracks ' + error.message);
                    resolve(null);
                });
        }))
    }
    return Promise.all(promises);
}

async function cacheTopArtistsRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistTopTracks(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('top albums db update');
            const apiSearchResp = await run(dbSearchResp.id);
            const updateRes = await databaseQueries.updateArtistTopTracks(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtistTopTracks(apiSearchResp);
        }
    }
}

module.exports = async function(id){
    await cacheTopArtistsRoutine(id);
    let resp = await databaseQueries.getArtistTopTracks(id);
    if(!resp){
        resp = {
            message: 'Top tracks not found.'
        }
    }
    return resp;
}

