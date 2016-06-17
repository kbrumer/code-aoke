var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
//needs track js functions for retrieving spotifyAPI data.
var track = require('./app/track/track.js');




var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use('/public', express.static('public'))

var port = 8888;


app.get('/', function(req, res){
  res.render('index.html');
})

app.post('/tracks', function(req, res){
  console.log('inside of /tracks get')
  var genre = req.body.genre;
  //function to pass as a callback to trackFetch
  var send = function(){
    res.send(track.tracks);
  }
  track.trackFetch(genre, send);
});




app.listen(port, function(){
  console.log('app listening on port ' + port);
})
