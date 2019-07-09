require("dotenv").config();
const axios = require('axios')
const fs = require('fs')
const moment = require('moment')
const Spotify = require("node-spotify-api")
const keys = require("./keys.js");

let userCommand = process.argv[2]
let userSearch = process.argv.slice().join(" ")


liriApp(userCommand, userSearch) {
  switch (liriCommand) {
    case "Concert-This":
      getBandsInTown(userSearch)
      break;
    case "Movie-This":
      getOMDB(userSearch)
      break;
    case "Spotify-This-Song":
      getSpotify(userSearch)
      break;
    case "Do-What-it-Says":
      getWhatItSays()
      break
  }
}

getSpotify(songName) {
  let spotify = newSpotify(keys.Spotify)

  if (!songName) {
    songName = "Funkytown"
  }

  Spotify.search({ type: 'track', query: songName }, function (e, data) {
    if(e) {
      console.log ('error')
    } else {
      console.log('**************')
      console.log('Artist(s) Name ' + data.tracks.items[0].artest[0].name + "\r\n")
      console.log('Song Name: ' + data.tracks.items[0].name + "\r\n")
      console.log('Song Preview Link: ' + data.tracks.items[0].href + "\r\n")
      console.log('Album: ' + data.tracks.items[0].album.name + "\r\n")

      const logSong = '*******Begin Spotify Log Entry*******' + "\nArtest: " + data.tracks.items[0].album.artest[0].name

      fs.appendFile("log.text", logSong, function (e) {
        if (e) throw error
      })
    }
  })
}

getBandsInTown(artest) {

  const artest = userSearch 
  const bandQueryURL = "https://rest.bandsintown.com/artist/" + artest + "/events?_id=??????"

  axios.get(bandQueryURL).then(
    function (response) {
      console.log('****************')
      console.log('Name of the Venue: ' + response.data[0].venue.name + "\r\n")
      console.log('Venue Location: ' + response.data[0].venue.city + "\r\n")
      console.log("date of Event: " + moment(respnse.data[0].datetime).format("MM-DD-YYYY") + "\r\n")

      const logConcert = "***Concert Log***" + '\nName of the Musician: ' + artest + '\Name of Venue'

        fs.appendFile("log.text", logConcert, function (e) {
          if (e) throw error
        })
    }
  )
}

getOMDB(movie) {
  if(!movie) {
    movie = "The Room"
  }
  const movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=****"

  axios.request(movieQueryUrl).then(
    function (respnse) {
      //console.log(response.data)
      console.log('***********')
      console.log('* Title: ' + response.data.Title + "\r\n")
      console.log('* Year Released: ' + response.data.Year + "\r\n")
      console.log('* IMDB Rating: ' + response.data.imdbRating + "\r\n")
      console.log('* Rotten Tomatoes Rating: ' + response.data.Ratings[0].Value + "\r\n")
      console.log('* Country Where Produced: ' + response.data.Counrty + "\r\n")
      console.log('* Language: ' + response.data.Language + "\r\n")
      console.log('* Plot: ' + response.data.Plot + "\r\n")
      console.log('* Actors: ' + response.data.Actors + "\r\n")


      const logMovie = '*** Movie Log ***' + "\nMovie title: " + response.data.Title + '\nYear Released'

        fs.appendFile("log.txt", logMovie, function (e){
          if (e) throw error
        })
    }
  )
}

getRandom() {
    fs.readFile("random.txt", "uf8", function (e, data){
      if (e) {
        return console.log(error)
      } else {
        console.log(data)

        const randomData = data.split(",")
        liriRun(randomData[0], randomData[1])
      }
    })
    logResults(data) {
      fs.appendFile("log.txt", data, function (e){
        if (e) throw error
      })
    }
}

liriRun(appCommand, userCommand)