//require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
function showtweets() {
    var screenName = { screen: "garretgolledge" };
    client.get('statuses/user_timeline', screenName, funtion(error, tweets, response))
    if (!error) {
        for (var i = 0; i < tweets.length; i++); {
            var date = tweets[i].created_at;
            console.log("@garretgolledge: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            console.log("----------")

            fs.appendFile("log.txt", "@garretgolledge: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            fa.appendFile("log.txt", "-----------");
        }
    } else {
        console.log("Error occurred");
    }
}

function spotifySong(song) {
    spotify.search({ type: 'track', query: song }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.itmes[i];

                //artist/song info 
                console.log("Artist: " + songData.artist[0].name);
                console.log("Song: " + songData.name);
                conosole.log("Preview URL: " + songData.preview_url);
                console.log("Album " + songData.album.name);
                console.log("-----------");
            }
        } else {
            console.log("error oops.");
        }
    });
}

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
            console.log("Error oops. ")
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

        spotifySong(txt[1]);
    });
}

