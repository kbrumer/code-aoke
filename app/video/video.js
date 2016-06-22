var request = require('request');
var youTubeAPI = require('../../config/youtube_api.js');


(function(){

  var client_id = youTubeAPI.yt_client_id;
  var client_secret = youTubeAPI.yt_client_secret;
  var redirect_uri = youTubeAPI.yt_redirect_uri;


  var url = 'https://accounts.google.com/o/oauth2/auth?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=https://www.googleapis.com/auth/youtube&response_type=code&access_type=offline'


  var videoFetch = function(){
    console.log('inside of videoFetch');
    request.post(url, function(error, response, json){
      if(error){
        console.log(error);
      };
      if (!error) {
        console.log(response.headers);
        // console.log(response);
      }
      // callback();
    });
  }

  module.exports = {
    videoFetch : videoFetch,
  }
})();
