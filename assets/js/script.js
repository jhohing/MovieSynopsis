// function displayMovieInfo() {

//     var movie = $("#movieName").val();
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=5f315e32";

//     // Creates AJAX call for the specific movie button being clicked
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//       console.log(response);

//     });

//   }

//   //calls the displayMovieInfo function when the submit button is clicked
//   $(document).on("click", "#search", displayMovieInfo);

$("#search").on("click", function(event){
    event.preventDefault();

    var movie = $("#movieName").val();
    var queryURL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

    });
});