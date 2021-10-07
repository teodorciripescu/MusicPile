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
                resolve(true)
            },
            function(err) {
                resolve(err)
            }
        );
    })

}
async function getArtistsIds(){
    return new Promise(resolve => {
        fs.readFile('top50.json', 'utf8', function (err, data) {
            if (err) throw err;
            let top_songs = JSON.parse(data);
            top_songs = top_songs.tracks;
            artists = top_songs.map(track => track.artists);
            // console.log(artists)
            let artistsSet = artists.map(group => group.map(artist => artist.id));
            artists = [];
            for(let a of artistsSet){
                artists.push(...a)
            }
            artists = new Set(artists)
            artists = Array.from(artists)
            resolve(artists)
        });
    });
}

async function getArtistsData(){
    return new Promise(async resolve => {
        const result = await run();
        const artistsIds = await getArtistsIds();
        console.log(artistsIds.length)
        let promises = [];
        const delay = ms => new Promise(res => setTimeout(res, ms));

        for (var i = 0; i < artistsIds.length; i+=50) {
            promises.push(new Promise(resolve1 => {
                var arr;
                // console.log(i, artistsIds.length)
                if(artistsIds.length - i >= 50){
                    arr = artistsIds.slice(i, i+50)
                } else{
                    arr = artistsIds.slice(i, artistsIds.length)
                }
        // console.log(arr)
                spotifyApi.getArtists(arr)
                    .then(function(data) {
                        // console.log('Artists information', data.body);
                        resolve1(data.body);
                    }, function(err) {
                        console.error(err);
                        resolve1(err);
                    })
            }));
        }


        Promise.all(promises).then((values) => {
            var artists = [];
            for (let i = 0; i < values.length; i++) {
                artists.push(...values[i].artists)
            }
            resolve(artists)
        });
    })

}
function digestArtistsData(artistData){
    var digestedArtists = [];
    for (let i = 0; i < artistData.length; i++) {
        const artist = artistData[i];
        const artistInfo = {
            name: artist.name,
            id: artist.id,
            genres: artist.genres,
            followers: artist.followers.total,
            popularity: artist.popularity,
            date: Date.now()
        }
        digestedArtists.push(artistInfo)
    }
    return digestedArtists;
}
function saveArtists(artists){
    // console.log(artists)
    return new Promise(resolve => {
        const json = JSON.stringify(artists)
        fs.writeFile('top_artists.json', json, 'utf8', function(){
            console.log('Got top artists');
            resolve(true)
        });
    })
}
async function getArtists(){
    const rawArtists = await getArtistsData();
    const digestedArtists = digestArtistsData(rawArtists);
    console.log(digestedArtists)
    const saved = await saveArtists(digestedArtists);
    // console.log(saved)
    return digestedArtists;
}

module.exports = getArtists;