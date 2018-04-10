require("dotenv").config();

var apiKeys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var client = new twitter(apiKeys.twitter);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(apiKeys.spotify);

var fs = require("fs");

// var request = require("request");
// var apiKeys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";

for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

switch (command) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        if (x) {
            spotifySong(x);
        } else {
            spotifySong("");
        }
        break;

    case "movie-this":
        if (x) {
            omdbData(x)
        } else {
            omdbData("")
        }
        break;

    case "do-what-it-says":
        doThing();
        break;

    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
        break;
}
//twitter info 
function showTweets() {
    var screenName = { screen_name: "garretgolledge" };
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets)
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i]['created_at'];
                console.log("@garretgolledge: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("----------")
            }
        } else {

            console.log(error);
        }
    })
}
//spotify info 
function spotifySong(songData) {
    spotify.search({ type: 'Artist', query: songData }, function (error, artist, data) {
        if (!error) {
            console.log(error)

            for (var i = 0; i < artist.sonData; i++) {
                var songData = artist.song[i]

                console.log("Artist " + "Song " + preview_url + album)

                //         //artist/song info 
                // console.log("Artist: " + songData.Artist);
                // console.log("Song: " + songData);
                // console.log("Preview URL: " + songData.preview_url);
                // console.log("Album " + songData.album);
                console.log("-----------");
            }
        } else {
            console.log(error);
        }
    })



    function omdbData(movie) {
        var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

        request(omdbURL, function (error, response, body) {
            if (!error && response.statusCodecode === 200) {
                var body = JSON.parse(body);

                //logs movie info
                console.log("Title: " + body.Title);
                console.log("Relase Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.tomatoRating);

                fs.appendFile('log.txt', "title: " + body.Title);
                fs.appendFile('log.txt', "Release Year: " + body.Year);
                fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
                fs.appendFile('log.txt', "Country: " + body.Country);
                fs.appendFile('log.txt', "Language: " + body.Language);
                fs.appendFile('log.txt', "Plot: " + body.Plot);
                fs.appendFile('log.txt', "Actors: " + body.Actors);
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);

            } else {
                console.log(error)
            }
            if (movie === "Mr. Nobody") {
                console.log("---------");
                console.log("{If you havnt watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("Its on Netflix!");

                fs.appendFile('log.txt', "----------");
                fs.appendFile('log.txt', "If you havnt watched 'Mr. Nobody, ' then you should: http://www.imdb.com/title/tt0485947/");
                fs.appendFile('log.txt', "Its on Netflix!");
            }
        });
    }

    function doThing() {
        fs.readFile('random.txt', "utf8", function (error, data) {
            var txt = data.split(',');
            

        });
    }

}

