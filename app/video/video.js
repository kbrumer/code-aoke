var request = require('request');


(function(){

  /// VIDEO CODE TO BE REFACTORED TO YOUTUBE TRACK FILTER ////
  var videos = [];
  var Video = function(opts){
    this.title = opts.title,
    this.image = opts.image,
    this.id = opts.id,
    this.description = opts.description
  };

  var videoFetch = function(track , artist, callback){
    var url = "https://www.googleapis.com/youtube/v3/search";
    var properties = {
        key: 'AIzaSyB379-eVXShLJqsXfu06uASkyQmrN-wYPg', //Use the API key to authorize the search
        q: 'karaoke ' + artist + track, //Specifies the query term to search for
        part: 'snippet', //Specifies a comma-separated list of one or more SEARCH resource properties that the API response will include. SNIPPET is the parameter value.
        type: 'video', //Excludes playlists and channels from results
        videoEmbeddable: true, //Specifies only embeddable videos
        maxResults: 3, //maximim number of results
        format: 'json'
      }

    console.log('inside of videoFetch');
    videos.length = 0;
    request.get({url : url, qs : properties}, function(error, response, json){
      if(error){
        console.log(error);
      };
      if (!error) {
        console.log('no error');
        json  = JSON.parse(json);
        // console.log(json.items);
        for (i = 0 ; i < json.items.length; i ++){
          console.log(json.items[i].snippet);
          var opts = {
            title : json.items[i].snippet.title,
            id : json.items[i].id.videoId,
            image : json.items[i].snippet.thumbnails.high.url,
            description : json.items[i].snippet.description
          }
          var video = new Video(opts);
          videos.push(video);
        };
        callback(videos);
      }
    });
  }



  module.exports = {
    videoFetch : videoFetch,
    videos : videos
  }
})();
