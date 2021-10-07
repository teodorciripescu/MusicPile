var client_id = 'client_id'; // Your client id
var client_secret = 'client_secret'; // Your secret
var redirect_uri = 'https://google.com/'; // Your redirect uri


/* Load the HTTP library */
var http = require("http");
const fetch = require('node-fetch');
/* Create an HTTP server to handle responses */

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);

async function getData()
{
    var response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
            "client_secret": client_secret,
            "client_id": client_id,
        })
    });


    const data = await response.body;
    console.log(data)
}

getData()