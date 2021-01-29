
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

//ID for the movie 
var search = document.querySelector("#search");
var movieTitle = document.querySelector("#movieTitle");
var moviePlot = document.querySelector("#moviePlot");
var movieGenre = document.querySelector("#movieGenre");
var movieRelease = document.querySelector("#movieRelease");
var movieRuntime = document.querySelector("#movieRuntime");
var movieImages = document.querySelector("#movieImages")
var movieRate = document.querySelector("#movieRate");

$("#search").on("click", function (event) {

    event.preventDefault();

    var movie = $("#movieName").val();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            movieTitle.textContent = response.Title;
            movieGenre.textContent = response.Genre
            moviePlot.textContent = response.Plot;
            //images
            var html = `
            <figure>
                <img src="${response.Poster}" alt="${response.Title}"/>
            </figure>
            `;
            movieRate.textContent = response.Rated;
            movieRuntime.textContent = response.Runtime;
            movieRelease.textContent = response.Released;
            $('#movieImages').prepend(html);
            var year = response.year;

            //search for movies in the tmdb api to pull the movie id
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie?api_key=672a687385a347033563aaac66395287&query=" + movie + "&year=" + year,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                });
        });


});
