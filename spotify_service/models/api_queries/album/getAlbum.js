const databaseQueries = require("../../database_queries");
const getArtist = require("../artist/getArtist");

async function run(id, page){
    return new Promise(async resolve => {
        spotifyApi.getAlbum(id, { limit: 50, offset: page * 50 })
            .then(async function(data) {
                    let album = {...data.body};
                    album.id = id;
                    album.page = page;
                    const artists = data.body.artists;
                    let artistsWithImage = [];
                    for (let i = 0; i < artists.length; i++) {
                        const artist = await getArtist(artists[i].id);
                        artistsWithImage.push(artist);
                    }
                    album.artists = artistsWithImage;
                    resolve(album);
                }, function(err) {
                    resolve(err);
                }
            );
    });
}

async function cacheAlbumsRoutine(id, page){
    // check for existance in db
    const dbSearchResp = await databaseQueries.getArtistAlbums(id, page);
    if(dbSearchResp){ //if exists, check age
        // check how old is the data and update the DB if needed
        const dataAge = (new Date() - dbSearchResp.updatedAt) / 3600000;
        if (dataAge > 24) {
            console.log('album db update');
            const apiSearchResp = await run(dbSearchResp.id, page);
            const updateRes = await databaseQueries.updateArtistAlbums(apiSearchResp, page);
        }
    } else{ //else make api call and save to db
        const apiSearchResp = await run(id, page);
        if(apiSearchResp){
            const addRes = await databaseQueries.addArtistAlbums(apiSearchResp);
        }
    }
}

module.exports = async function(id, page){
    await cacheAlbumsRoutine(id, page);
    let resp = await databaseQueries.getArtistAlbums(id, page);
    if(!resp){
        resp = {
            message: 'Album not found.'
        }
    }
    return resp;
}


