const databaseQueries = require("../../database_queries");

async function run(id, page){
    return new Promise(async resolve => {
        spotifyApi.getArtistAlbums(id, { limit: 20, offset: page * 20 })
            .then(function(data) {
                let albums = {};
                albums.id = id;
                albums.page = page;
                albums.albums = data.body.items;
                resolve(albums);
            }, function(err) {
                resolve(err);
            }
        );
    });
}
async function cacheTopAlbumsRoutine(id, page){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistTopAlbums(id, page);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('top albums db update');
            const apiSearchResp = await run(dbSearchResp.id, page);
            const updateRes = await databaseQueries.updateArtistTopAlbums(apiSearchResp, page);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id, page);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtistTopAlbums(apiSearchResp);
        }
    }
}

module.exports = async function(id, page){
    await cacheTopAlbumsRoutine(id, page);
    let resp = await databaseQueries.getArtistTopAlbums(id, page);
    if(!resp){
        resp = {
            message: 'Top album not found.'
        }
    }
    return resp;
}

