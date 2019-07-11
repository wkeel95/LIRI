require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var Spotify = require('node-spotify-api');
const axios = require('axios');








var spotify = new Spotify({
    id: < your spotify client id > ,
    secret: < your spotify client secret >
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});

axios.get('/user?ID=12345')
    .then(function(response) {
        // handle success
        console.log(response);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .finally(function() {
        // always executed
    });