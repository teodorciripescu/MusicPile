const databaseQueries = require("../../database_queries");
const getArtist = require("../artist/getArtist");

async function run(id){
    return new Promise(async resolve => {
        spotifyApi.getTrack(id)
            .then(async function(data) {
                const artists = data.body.artists;
                let artistsWithImage = [];
                for (let i = 0; i < artists.length; i++) {
                    const artist = await getArtist(artists[i].id);
                    artistsWithImage.push(artist);
                }
                data.body.artists = artistsWithImage;
                resolve(data.body);
            }, function(err) {
                resolve(err);
            });
    });
}
async function cacheTrackRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getTrack(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('track db update');
            const apiSearchResp = await run(dbSearchResp.id);
            const updateRes = await databaseQueries.updateTrack(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addTrack(apiSearchResp);
        }
    }
}

module.exports = async function(id){
    await cacheTrackRoutine(id);
    let resp = await databaseQueries.getTrack(id);
    if(!resp){
        resp = {
            message: 'Track not found.'
        }
    }
    return resp;
}

