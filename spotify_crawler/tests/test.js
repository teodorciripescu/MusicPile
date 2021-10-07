const CLIENT_ID = 'client_id'
const CLIENT_SECRET = 'client_secret'
var SpotifyWebApi = require('spotify-web-api-node');
var fs = require('fs');

var categories = new Set();

var spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});
async function run(){
    await spotifyApi.clientCredentialsGrant().then(
        async function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            var countries = JSON.parse(fs.readFileSync('countries.json', 'utf8'));
            var my_promises = [];
            for (let i = 0; i < countries.length; i++) {
                my_promises.push(new Promise(async resolve => {
                    await getCategories(10,0, countries[i].Code)
                    resolve(true)
                }));
            }
            await my_promises.reduce(async (previousPromise, nextAsyncFunction) => {
                await previousPromise;
                const result = await nextAsyncFunction();
                console.log(result);
            }, Promise.resolve());
        },
        function(err) {
            // console.log('Something went wrong when retrieving an access token', err);
        }
    );
}
async function getCategories(limit, offset, country){
    try{
        var data = await spotifyApi.getCategories({
            limit : limit,
            offset: offset,
            country: country
        })
            .then(async function(data) {
                // console.log(data.body);
                data = data.body.categories;
                for (let i = 0; i < data.items.length; i++) {
                    categories.add(JSON.stringify({id: data.items[i].id, name:data.items[i].name, country:country}))
                }
                return data;
            }, function(err) {
                console.log("Something went wrong!", err);
            });

            // categories.add([data.items[i].id, data.items[i].name])
            // console.log('.')

        // if(data.total - offset >= 5) {
        //     await getCategories(limit, offset + 5)
        // } else if (data.total - offset > 0 && data.total - offset < 5){
        //     await getCategories(limit, data.total - offset)
        // }
        // offset += offset

    } catch(e){
        // console.log(e);
    }
}
async function getAllCategories(){
    const read_categs = JSON.parse(fs.readFileSync('music_categories.json', 'utf8'))
    console.log(read_categs.length)
    for (let i = 0; i < read_categs.length; i++) {
        categories.add(JSON.stringify({id: read_categs[i].id, name:read_categs[i].name, country:read_categs[i].country}))
    }
    await run();
    // console.log(categories)
    console.log(categories.size)
    const formattedSet = [...categories].map((item) => {
        if (typeof item === 'string') return JSON.parse(item);
        else if (typeof item === 'object') return item;
    });
    const json = JSON.stringify(Array.from(formattedSet))
    fs.writeFile('music_categories.json', json, 'utf8', function (){});
}


getAllCategories()

