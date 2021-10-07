const axios = require('axios');
const databaseQueries = require('../../database_queries');

async function run(name){
    return new Promise(async resolve => {
        axios.get(encodeURI(`https://api.genius.com/search?q=${name.trim()}`))
            .then(async function (response) {
                response = response.data;
                if(response.meta.status === 200){
                    const artistId = response.response.hits[0].result.primary_artist.id;
                    //console.log(artistId)
                    const responseById = await getArtistById(artistId);
                    if(responseById.meta.status === 200){
                        let artist = responseById.response.artist;
                        delete artist.current_user_metadata;
                        delete artist.description_annotation;
                        delete artist.user;
                        resolve(artist);
                    } else{
                        resolve(responseById.meta);
                    }
                } else{
                    resolve(response.meta);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                resolve(error);
            });
    });
}

async function getArtistById(id){
    return new Promise(async resolve => {
        axios.get(encodeURI(`https://api.genius.com/artists/${id}?text_format=plain`))
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });

    });
}
async function getArtistByIdRefined(id){
    return new Promise( async resolve => {
        let responseById = await getArtistById(id);
        if(responseById.meta.status === 200){
            let artist = responseById.response.artist;
            delete artist.current_user_metadata;
            delete artist.description_annotation;
            delete artist.user;
            resolve(artist);
        } else{
            resolve(responseById.meta);
        }
    });
}
async function cacheArtistRoutine(name){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistByName(name);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        // console.log(dataAge);
        if (dataAge > 24) {
            console.log('artist db update');
            const apiSearchResp = await getArtistByIdRefined(dbSearchResp.id);
            const updateRes = await databaseQueries.updateArtist(apiSearchResp);
        }

    } else{ //else make api call and save to db
        const apiSearchResp = await run(name);
        // check existence in db using id(in case user misspelled the 'name')
        const dbSearchResp = await databaseQueries.getArtistById(apiSearchResp.id);
        const nameMatch = apiSearchResp.name.toLowerCase() === name.trim().toLowerCase();
        if(!dbSearchResp && nameMatch){
            const addRes = await databaseQueries.addArtist(apiSearchResp);
        }
    }
}

module.exports = async function(name){
    await cacheArtistRoutine(name);
    let resp = await databaseQueries.getArtistByName(name);
    if(!resp){
        resp = {
            message: 'Artist not found.'
        }
    }
    return resp;
}

