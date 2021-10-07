const artistModel = require('../models&schemas/artists');
const topArtistModel = require('../models&schemas/top_artists');
const mongoose = require('mongoose');
const {CONNECTION_STRING} = require('../credentials');
const fs = require('fs');
var artists = [];

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
mongoose.connection.once('open', async function(){
    console.log('Connection has been made...');
    start();
}).on('error', function(error){
    console.log('Connection error:', error);
});

async function start(){
    var dates = new Set([]);
    for await (const artist of artistModel.find()) {
        console.log(`------------- ${artist.name}; ${artist.id} -------------`);
        artists.push({
            id: artist.id,
            name: artist.name,
            genres: [...artist.genres],
            data: []
        })

        for await (const artistDay of topArtistModel.find({id: artist.id}).lean()) {
            var myArtist = artistDay;
            var auxDate = new Date(myArtist.date).toLocaleDateString('en-US');
            myArtist.date = auxDate;
            artists[artists.length - 1].data.push(myArtist);
            dates.add(artistDay.date);
        }

        console.log(`Number of Entries: ${artists[artists.length - 1].data.length}`);

        // console.log(artists[artists.length - 1]);

    }
    dates = sortDates([...dates]);
    var datesIndex = {};
    for (let i = 0; i < dates.length; i++) {
        datesIndex[dates[i]] = i;
    }
    // console.log(dates);
    for (let i = 0; i < artists.length; i++) {

        for (let j = 0; j < artists[i].data.length; j++) {
            artists[i].data[j].date = datesIndex[artists[i].data[j].date];
        }
    }
    // createNodesCSV();
    createEdgesCSV();
}

function createNodesCSV(){
    var csvContent = "";
    csvContent += "Id,Label,Genres,Followers,Popularity,Interval,StaticFollowers,StaticPopularity,\n";
    for (let i = 0; i < artists.length; i++) { // iterate trough artists
        const a = artists[i].data;
        console.log([...artists[i].data[0].genres])
        var csvLine = `${artists[i].id},${artists[i].name},"${artists[i].data[0].genres}",`;
        var followers = `"<`, popularity = `"<`, timeInterval = `"<`;
        for (let j = 0; j < a.length; j++) {
            const auxFollowers = a[j].followers;
            const auxPopularity = a[j].popularity;
            const auxDate = a[j].date;
            followers += `[${auxDate}, ${auxDate},${auxFollowers}]; `;
            popularity += `[${auxDate}, ${auxDate},${auxPopularity}]; `;
            timeInterval += `[${auxDate},${auxDate}]; `;
        }
        csvLine += `${followers}>",`;
        csvLine += `${popularity}>",`;
        csvLine += `${timeInterval}>",`;
        csvLine += `${a[a.length-1].followers},`;
        csvLine += `${a[a.length-1].popularity},`;
        csvLine += '\n';
        csvContent += csvLine;
    }


    fs.writeFile('./artistsNodes.csv', csvContent, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });
    console.log(csvContent)
}

function createEdgesCSV(){
    var csvContent = "";
    csvContent += "Source,Target,Label,Type,Weight,\n";
    for (let i = 0; i < artists.length; i++) {
        const artist1 = artists[i].name;
        const source = artists[i].id;
        for (let j = 0; j < artists[i].genres.length; j++) {
            const commonGenre = artists[i].genres[j];
            for (let k = i + 1; k < artists.length; k++) {
                const artist2 = artists[k].name;
                const target = artists[k].id;
                if(artists[k].genres.includes(commonGenre)){
                    console.log(`${commonGenre} -> ${artist1} & ${artist2}`);
                    csvContent += `${source},${target},${commonGenre},Undirected,1,\n`;
                    // break;
                }
            }
        }
    }
    fs.writeFile('./artistsEdges.csv', csvContent, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
    });
    console.log(csvContent)
}

function sortDates(dates){
    return dates.sort(function(a,b){
        return new Date(a) - new Date(b);
    });
}