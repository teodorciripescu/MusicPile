const axios = require('axios');

async function run(name, id, platform_name){
    let url = '', port='';

    if(platform_name === 'Spotify'){
        port = 3500;
    } else if(platform_name === 'Genius'){
        port = 4500;
    }

    if(id){
        url = `http://localhost:${port}/api/artist?id=${id}`;
    } else if(name){
        url = `http://localhost:${port}/api/artist?name=${name}`;
    }
    url = encodeURI(url);
    return new Promise(async resolve => {
        axios.get(url)
            .then(function (response) {
                const resp = response.data;
                resolve(resp.data);
            })
            .catch(function (error) {
                console.log(error.message);
                resolve(null);
            });

    });
}

module.exports = async function(name, id, platform_name){
    let resp = await run(name, id, platform_name);
    if(!resp){
        resp = {
            message: `Artist not found on ${platform_name}.`
        }
    }
    return resp;
}

