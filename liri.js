require("dotenv").config();

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
    spotify.search({ type: 'track', query: song}, function(error, data){
        if(!error){
            
        }
    }
}