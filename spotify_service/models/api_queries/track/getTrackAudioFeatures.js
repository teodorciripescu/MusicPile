const databaseQueries = require("../../database_queries");

async function run(id){
    return new Promise(async resolve => {
        spotifyApi.getAudioFeaturesForTrack(id)
            .then(function(data) {
                resolve(data.body);
            }, function(err) {
                resolve(err);
            });
    });
}

async function cacheTrackAudioFeaturesRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getTrackAudioFeatures(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('tract features db update');
            const apiSearchResp = await run(dbSearchResp.id);
            const updateRes = await databaseQueries.updateTrackAudioFeatures(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addTrackAudioFeatures(apiSearchResp);
        }
    }
}

module.exports = async function(id){
    await cacheTrackAudioFeaturesRoutine(id);
    let resp = await databaseQueries.getTrackAudioFeatures(id);
    if(!resp){
        resp = {
            message: 'Track Audio Features not found.'
        }
    }
    return resp;
}

