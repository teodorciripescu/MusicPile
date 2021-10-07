//also save the query  string /api/track?query=band name song name

const axios = require('axios');
const databaseQueries = require("../../database_queries");


async function searchTrack(name){
    return new Promise(async resolve => {
        // console.log(name)
        axios.get(encodeURI(`https://api.genius.com/search?q=${name.trim()}`))
            .then(async function (response) {
                response = response.data;
                if(response.meta.status === 200 && response.response.hits.length){
                    // console.log(response.response);
                    const trackId = response.response.hits[0].result.id;
                    let responseById = await getTrackById(trackId);
                    responseById.search_query = name;
                    resolve(responseById);
                } else{
                    resolve(null);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                resolve(null);
            });
    });
}

async function getTrackById(id){
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

async function cacheTrackRoutine(name){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getTrackByName(name);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        // console.log(dataAge);
        if (dataAge > 24) {
            console.log('track db update');
            const apiSearchResp = await getTrackById(dbSearchResp.id);
            const updateRes = await databaseQueries.updateTrack(apiSearchResp);
        }

    } else{ //else make api call and save to db
        const apiSearchResp = await searchTrack(name);
        // check existence in db using id(in case user misspelled the 'name')
        const dbSearchResp = await databaseQueries.getTrackById(apiSearchResp.id);
        const query = apiSearchResp.primary_artist.name + ' ' + apiSearchResp.title;
        //console.log(query);
        const nameMatch = query.trim().toLowerCase() === name.trim().toLowerCase();
        //console.log(nameMatch);
        if(!dbSearchResp && nameMatch){
            const addRes = await databaseQueries.addTrack(apiSearchResp);
        }
    }
}

module.exports = async function(name){
    let resp = null;
    try{
        await cacheTrackRoutine(name);
        resp = await databaseQueries.getTrackByName(name);
    } catch(error){
        console.log(error);
        resp = {
            message: 'Track not found.'
        }
    }
    if(!resp){
        resp = {
            message: 'Track not found.'
        }
    }

    return resp;
}

