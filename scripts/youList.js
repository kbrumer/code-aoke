var videos = []; //an empty array to hold the videos from the API call
var videoList = $("ul.videoList") //CHANGE: the HTML location the videos are appended to

youSearch = function(tracks){
  $.ajax({
    url: "https://www.googleapis.com/youtube/v3/search",
    data: {
      key: 'AIzaSyDrkhWWeUjYxFqp9MAYZgtqlzKO2VLAH5M', //Use the API key to authorize the search
      q: 'karaoke' + tracks, //Specifies the query term to search for
      part: 'snippet', //Specifies a comma-separated list of one or more SEARCH resource properties that the API response will include. SNIPPET is the parameter value.
      type: 'video', //Excludes playlists and channels from results
      videoEmbeddable: 'true', //Specifies only embeddable videos
      maxResults: 3, //maximim number of results
      format: 'json',
    },
    dataType: 'jsonp',}
    success: function(obj) {
      //populate the "videos" array
      var arr = obj.items;
      $.each(arr, function(i, obj) {
        videos.push(obj);
      });
      //then, for each video....
      $.each(videos, function(i){
        var videoId = videos[i].id.videoId; //create variable videoId based on the object property
        var linkId = "https://www.youtube.com/watch?v=" + videoId; //create a link based on that variable
        var a = $('<a/>');
        a.attr("href", linkId); //Apply the link to the video
        //CHANGE: now append the video to the page
        var li = $('<li/>') //append list items using the video properties
          .text(videos[i].snippet.title)
          .attr("myLinkId", videos[i].id.videoId)
          .appendTo(videoList)
          .wrap(a);
      });
    },
  })
}
