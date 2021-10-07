async function run(id){
    return new Promise(async resolve => {
        spotifyApi.getAudioAnalysisForTrack(id)
            .then(function(data) {
                resolve(data.body);
            }, function(err) {
                resolve(err);
            });
    });
}
module.exports = async function(id){
    const resp = await run(id);
    return resp;
}

