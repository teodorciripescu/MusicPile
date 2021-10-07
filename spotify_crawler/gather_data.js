const mongoose = require('mongoose');
const {CONNECTION_STRING} = require('./credentials');

const modelTop50Songs = require('./models&schemas/top50songs');
const modelTopArtists = require('./models&schemas/top_artists');
const modelArtists = require('./models&schemas/artists');

const getArtists = require('./top_artists');
const getTop50Songs = require('./top_50');

const cron = require('node-cron');

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
mongoose.connection.once('open', async function(){
    console.log('Connection has been made...');
    startChronJob();
}).on('error', function(error){
    console.log('Connection error:', error);
});
function startChronJob(){
    cron.schedule('30 23 * * *', async function(){
        //run at 23:30 everyday
        const res = await pushToDatabase();
        console.log((new Date().getUTCHours()) + ":" + new Date().getUTCMinutes() + "Updated Database!");
    });
}

function addToDatabase(data, model){
    return new Promise(resolve => {
        var add = new model(data);
        add.save().then(function () {
            resolve(true);
        });
    });
}

function addTopArtistsToDatabase(data){
    var promises = [];
    for (let i = 0; i < data.length; i++) {
        promises.push(addToDatabase(data[i], modelTopArtists));
    }
    return Promise.all(promises);
}

async function pushToDatabase(){
    const top_songs = await getTop50Songs();
    // const add_top_songs_res = await addToDatabase(top_songs, modelTop50Songs);
    const top_artists = await getArtists();
    // const add_top_artists_res = await addTopArtistsToDatabase(top_artists);
    // const add_artists_res = await  addArtistsToDatabase(top_artists);

    // var GenerateSchema = require('generate-schema')
    // var schema = GenerateSchema.json('top_artists',top_artists[0]);
    // console.log(JSON.stringify(schema))
}


function addArtistsToDatabase(data){
    var promises = [];
    for (let i = 0; i < data.length; i++) {
        promises.push(updateArtistData(data[i], modelArtists));
    }
    return Promise.all(promises);
}

function updateArtistData(modelData, model){
    return new Promise(resolve => {
        model.findOne({id: modelData.id}).select(['-_id', '-__v']).lean().then(function (result) {
            if (result) {//this artist is present in the database
                if(checkIfNew(result, modelData)) {
                    model.updateOne({id: modelData.id}, modelData).then(function (result) {
                        resolve(true);
                    });
                }
                else resolve(true);
            }
            else {//this artist is not present in the database
                var add = new model(modelData);
                add.save().then(function () {
                    resolve(true);
                });
            }
        });
    });
}

function checkIfNew(oldData,newData){
    var i;
    if(oldData.name !== newData.name )return true;
    if(oldData.genres.length !== newData.genres.length)return true;
    for(i=0;i<newData.genres.length;i++)
        if(oldData.genres[i] !== newData.genres[i] )return true;
    if(oldData.followers !== newData.followers )return true;
    if(oldData.popularity !== newData.popularity )return true;
    return false;
}




