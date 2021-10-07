const CLIENT_ID = 'client_id'
const CLIENT_SECRET = 'client_secret'
var SpotifyWebApi = require('spotify-web-api-node');
var fs = require('fs');


var spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});


async function run(){
    return new Promise(async resolve => {
        await spotifyApi.clientCredentialsGrant().then(
            async function(data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.getAvailableGenreSeeds()
                    .then(function(data) {
                        let genreSeeds = data.body.genres;
                        console.log(genreSeeds);
                        const json = JSON.stringify(genreSeeds)
                        fs.writeFile('music_genres.json', json, 'utf8', function (){
                        resolve("Data saved!")
                        });
                    }, function(err) {
                        resolve(err)
                    });
            },
            function(err) {
                resolve(err)
            }
        );
    })

}


async  function test(){
    result = await run();
    console.log(result)
}


test()
