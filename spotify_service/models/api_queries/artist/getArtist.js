const databaseQueries = require("../../database_queries");

async function run(id){
    return new Promise(async resolve => {
        spotifyApi.getArtist(id)
            .then(async function(data) {
                var artist = data.body;
                artist.followers = artist.followers.total;
                if(artist.hasOwnProperty('images') && artist.images.length)
                    artist.image = artist.images[1].url;
                delete artist.external_urls;
                delete artist.href;
                delete artist.images;
                delete artist.type;
                delete artist.uri;
                artist.stats = null;
                artist.stats = await databaseQueries.getTopArtistStats(artist.id);
                resolve(artist);
            }, function(err) {
                console.log(err);
                resolve(null);
            });
    });
}

async function cacheArtistRoutine(id){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistById(id);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
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

