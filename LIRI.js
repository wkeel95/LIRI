require("dotenv").config();
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var spotify = new Spotify(keys.spotify);

var input = process.argv[2];
var nodeArgv = process.argv[3];

function choices(input) {
    switch (input) {
        case "concert-this":
            showConcerts();
            break;

        case "spotify-this-song":
            songSearch();
            break;

        case "movie-this":
            omdbData();
            break;

        case "do-what-it-says":
            dowhatitsays();
            break;

        default:
            console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
            break;
    }
}

function songSearch() {
    spotify.search({ type: 'track', query: nodeArgv }, function(error, data) {
        if (error) {
            console.log('Error occurred.');
        } else {

            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
            }
        }
    });
}

function omdbData() {
    var omdbURL = 'http://www.omdbapi.com/?t=' + nodeArgv + '&plot=short&apikey=trilogy';


    axios.get(omdbURL).then(
            function(response) {
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.Rated);
                console.log(response.data.Ratings);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);
            })
        .catch(function(error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function showConcerts() {
    var bandsURL = "https://rest.bandsintown.com/artists/" + nodeArgv + "/events?app_id=codingbootcamp";
    axios.get(bandsURL).then(
            function(response) {
                // console.log(response.data);
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city);
                console.log(response.data[0].datetime);
            })
        .catch(function(error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function dowhatitsays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        input = dataArr[0];
        nodeArgv = dataArr[1];
        choices(input);
    })
};


choices(input);