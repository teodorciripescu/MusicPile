const databaseQueries = require("../../database_queries");

async function run(name){
    return new Promise(async resolve => {
        spotifyApi.searchArtists(name)
            .then(async function(data) {
                if(data.body.artists.items.length > 0){
                    let artist = data.body.artists.items[0];
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
                    if(artist.name.toLowerCase() === name.trim().toLowerCase()){
                        resolve(artist);
                    } else{
                        resolve(null);
                    }

                } else{
                    resolve(null);
                }
            }, function(err) {
                resolve(err);
            });
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
            const apiSearchResp = await run(name);
            const updateRes = await databaseQueries.updateArtist(apiSearchResp);
        }

    } else{ //else make api call and save to db
        const apiSearchResp = await run(name);
        if(apiSearchResp){
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

