async function run(id, page){
    return new Promise(async resolve => {
        spotifyApi.getAlbum(id, { limit: 50, offset: page * 50 })
            .then(function(data) {
                resolve(data.body);
            }, function(err) {
                resolve(err);
            });
    });
}
module.exports = async function(id, page){
    const resp = await run(id, page);
    return resp;
}

