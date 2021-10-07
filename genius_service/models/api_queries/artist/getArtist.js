const axios = require('axios');
const databaseQueries = require("../../database_queries");

async function run(id){
    return new Promise(async resolve => {
        axios.get(encodeURI(`https://api.genius.com/artists/${id}?text_format=plain`))
            .then(function (response) {
                const responseById = response.data;
                if(responseById.meta.status === 200){
                    let artist = responseById.response.artist;
                    delete artist.current_user_metadata;
                    delete artist.description_annotation;
                    delete artist.user;
                    resolve(artist);
                } else{
                    resolve(responseById.meta);
                }
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });

    });
}

async function cacheArtistRoutine(id){
    // check for existence in db
    const dbSearchResp = await databaseQueries.getArtistById(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        // console.log(dataAge);
        if (dataAge > 24) {
            console.log('artist db update');
            const apiSearchResp = await run(dbSearchResp.id);
            const updateRes = await databaseQueries.updateArtist(apiSearchResp);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtist(apiSearchResp);
        }
    }
}

module.exports = async function(id){
    await cacheArtistRoutine(id);
    let resp = await databaseQueries.getArtistById(id);
    if(!resp){
        resp = {
            message: 'Artist not found.'
        }
    }
    return resp;
}

