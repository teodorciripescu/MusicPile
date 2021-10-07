const {CLIENT_ID, CLIENT_SECRET} = require('./credentials');
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
                spotifyApi.getPlaylistTracks('37i9dQZEVXbMDoHDwVN2tF', {
                    offset: 0,
                    limit: 50,
                    fields: 'items'
                })
                    .then(
                        function(data) {
                            // console.log('The playlist contains these tracks', data.body);
                            resolve(data.body.items)
                        },
                        function(err) {
                            // console.log('Something went wrong!', err);
                            resolve(err)
                        }
                    );
            },
            function(err) {
                resolve(err)
            }
        );
    })

}


async function getTop50Songs(){
    return new Promise(async resolve => {
        result = await run();
        console.log(result[0].track)

        data = result.map(track => (
            {
                release_date: track.track.album.release_date,
                name: track.track.name,
                id: track.track.id,
                popularity: track.track.popularity,
                artists: track.track.artists.map(artist => ({ name: artist.name, id:artist.id})),

            }));
        console.log()
        data = {date:Date.now(), tracks:[...data]}
        // console.log(data.length)
        const json = JSON.stringify(data)
        fs.writeFile('top50.json', json, 'utf8', function(){
            console.log('Got top 50 songs');
            resolve(data)
        });
    })

}


module.exports = getTop50Songs;


//https://developer.spotify.com/documentation/web-api/reference/#category-artists