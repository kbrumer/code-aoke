(function(module){
var trackList = {};
// trackList.All = [];

trackList.toHtml = function(track){
  getCompiledTemplate("track").then(function(handlebarsCompile){
    console.log(handlebarsCompile);
    var html = handlebarsCompile(track);
    console.log(html);
    $('#track-list').append(html);
  });
}

trackList.genreFetch = function(){
  $('#genre-form').submit(function(e){
    // trackList.All.length = 0;
    e.preventDefault();
    var selectGenre = $(this).find('#genre-select , option:selected').val();
    console.log(selectGenre);
    $.ajax({
      type: 'POST',
      url: '/genreTracks',
      data: {
        'genre' : selectGenre
      }
    })
    .then(function(data){
      data.forEach(function(track){
        trackList.toHtml(track);
        console.log(track);
      })
      // console.log(trackList.All);
    })
  });
};

trackList.initAll = function(){
  trackList.genreFetch();
}

module.trackList = trackList;

})(window);
