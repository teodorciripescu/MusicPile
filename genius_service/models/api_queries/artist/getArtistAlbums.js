async function run(id, page){
    return new Promise(async resolve => {
        spotifyApi.getArtistAlbums(id, { limit: 20, offset: page * 20 })
            .then(function(data) {
                resolve(data.body);
            }, function(err) {
                resolve(err);
            }
        );
    });
}
module.exports = async function(id, page){
    const resp = await run(id, page);
    return resp;
}

