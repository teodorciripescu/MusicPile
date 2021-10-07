const databaseQueries = require("../../database_queries");

async function run(id, country){
    return new Promise(async resolve => {
        global.spotifyApi.getArtistTopTracks(id, country)
            .then(function (data) {
                //the first artist is not necessarily the wanted one
                let artists = data.body.tracks[0].album.artists;
                let artistName = '';
                for (let i = 0; i < artists.length; i++) {
                    // console.log(artists[i].name);
                    if(artists[i].id === id){
                        artistName = artists[i].name;
                        break;
                    }
                }
                let topTracks = {};
                // topTracks.name = artist.name;
                // topTracks.id = artist.id;
                topTracks.name = artistName;
                topTracks.id = id;
                topTracks.tracks = data.body.tracks;
                for (let i = 0; i < topTracks.tracks.length; i++) {
                    delete topTracks.tracks[i].album;
                    delete topTracks.tracks[i].artists;
                }
                // console.log(topTracks)
                resolve(topTracks);
            }, function (err) {
                resolve(err);
            });
    });
}

async function cacheTopTracksRoutine(id, country){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistTopTracks(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('top tracks db update');
            const apiSearchResp = await run(dbSearchResp.id, country);
            const updateRes = await databaseQueries.updateArtistTopTracks(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id, country);
        // console.log(id + ' ' + apiSearchResp.id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtistTopTracks(apiSearchResp);
        }
    }
}

module.exports = async function(id, country){
    await cacheTopTracksRoutine(id, country);
    let resp = await databaseQueries.getArtistTopTracks(id);
    if(!resp){
        resp = {
            message: 'Top tracks not found.'
        }
    }
    return resp;
}

