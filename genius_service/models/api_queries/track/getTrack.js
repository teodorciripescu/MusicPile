const axios = require('axios');
const databaseQueries = require("../../database_queries");

async function run(id){
    return new Promise(async resolve => {
        axios.get(encodeURI(`https://api.genius.com/songs/${id}?text_format=plain`))
            .then(function (response) {
                const resp = response.data;
                if(resp.meta.status === 200){
                    let track = resp.response.song;
                    delete track.current_user_metadata;
                    delete track.song_relationships;
                    delete track.custom_performances;
                    delete track.description_annotation;
                    // delete track.producer_artists;
                    // delete track.writer_artists;
                    delete track.verified_annotations_by;
                    delete track.verified_contributors;
                    delete track.verified_lyrics_by;
                    // track.forEach(function(t){ delete t.primary_artist });
                    resolve(track);
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

async function cacheTrackRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getTrackById(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        // console.log(dataAge);
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
    let resp = await databaseQueries.getTrackById(id);
    if(!resp){
        resp = {
            message: 'Track not found.'
        }
    }
    return resp;
}

