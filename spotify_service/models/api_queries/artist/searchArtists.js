const databaseQueries = require("../../database_queries");

async function run(name){
    return new Promise(async resolve => {
        spotifyApi.searchArtists(name)
            .then(function(data) {
                if(data.body.artists.items.length > 0){
                    let searchResult = {};
                    searchResult.artists = data.body.artists.items;
                    searchResult.name = name;
                    resolve(searchResult);
                } else{
                    resolve(null);
                }
            }, function(err) {
                resolve(err);
            });
    });
}

async function cacheSearchArtistRoutine(name){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getSearchArtist(name);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        // console.log(dataAge);
        if (dataAge > 24) {
            console.log('artist db update');
            const apiSearchResp = await run(name);
            const updateRes = await databaseQueries.updateSearchArtist(apiSearchResp);
        }

    } else{ //else make api call and save to db
        const apiSearchResp = await run(name);
        if(apiSearchResp){
            const addRes = await databaseQueries.addSearchArtist(apiSearchResp);
        }
    }
}

module.exports = async function(name){
    await cacheSearchArtistRoutine(name);
    let resp = await databaseQueries.getSearchArtist(name);
    if(!resp){
        resp = {
            message: 'No artists not found.'
        }
    }
    return resp;
}

