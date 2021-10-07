const databaseQueries = require("../../database_queries");

async function run(id){
    return new Promise(async resolve => {
        spotifyApi.getArtistRelatedArtists(id)
            .then(function(data) {
                let relatedArtists = {};
                relatedArtists.id = id;
                relatedArtists.artists = data.body.artists;
                resolve(relatedArtists);
            }, function(err) {
                resolve(err);
            });
    });
}

async function cacheRelatedArtistsRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistRelatedArtists(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('top albums db update');
            const apiSearchResp = await run(dbSearchResp.id);
            const updateRes = await databaseQueries.updateArtistRelatedArtists(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtistRelatedArtists(apiSearchResp);
        }
    }
}

module.exports = async function(id){
    await cacheRelatedArtistsRoutine(id);
    let resp = await databaseQueries.getArtistRelatedArtists(id);
    if(!resp){
        resp = {
            message: 'Related artists not found.'
        }
    }
    return resp;
}

