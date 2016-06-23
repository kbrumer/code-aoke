(function(module){

  var Video = function(opts){
    this.videoId = opts.videoId;
    this.channelTitle = opts.channelTitle;
    this.videoDescription = opts.videoDescription;
    this.imageUrl = opts.imageUrl;
    this.videoTitle = opts.videoTitle;
  }

  var videos = [];
  var fetchVideoResponse = [];

  var videoFetch = function(){
    $('#track-list').on('click', '.track', function(){
      var track = $(this).text();
      console.log(track);
      $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        data: {
          key: 'AIzaSyDrkhWWeUjYxFqp9MAYZgtqlzKO2VLAH5M',
          q: 'karaoke' + track,
          part: 'snippet',
          type: 'video',
          videoEmbeddable: 'true',
          maxResults: 3,
          format: 'json'
        }
      })
      .then(function(obj){
        var arr = obj.items;
        console.log(arr);
        $.each(arr, function(i, obj){
          var opts = {
            videoId: arr[i].id.videoId,
            channelTitle: arr[i].snippet.channelTitle,
            videoDescription: arr[i].snippet.description,
            imageUrl: arr[i].snippet.thumbnails.high.url,
            videoTitle: arr[i].snippet.title,
          }
        var video = new Video(opts);
        videos.push(video);
        console.log(videos);
        })
      })
    });
  };


Video.initAll = function(){
  videoFetch();
}

module.Video = Video;

})(window)
