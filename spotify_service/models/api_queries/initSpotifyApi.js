const cron = require('node-cron');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = async function startChronJob(){
    global.spotifyApi = await getSpotifyApiObject();
    cron.schedule('*/59 * * * *', async function(){
        //run every 59 minutes
        global.spotifyApi = await getSpotifyApiObject();
        console.log((new Date().getUTCHours()) + ":" + new Date().getUTCMinutes() + "Updated Spotify Token!");
    });
}

async function getSpotifyApiObject(){
    return new Promise(async resolve => {
        var spotifyApi = new SpotifyWebApi({
            clientId: 'clientId',
            clientSecret: 'clientSecret'
        });
        await spotifyApi.clientCredentialsGrant().then(
            async function(data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                resolve(spotifyApi);
            },
            function(err) {
                resolve(err)
            }
        );
    })
}
