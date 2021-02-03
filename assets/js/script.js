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

// //settings for the utelly api which is being used through rapidapi.com
// const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "8b595659e5msh577c7ebae66487cp1fe1b8jsnb6613348d882",
//         "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
//     }
// };

$("#search").on("click", function (event) {

    event.preventDefault();

    var movie = $("#movieName").val();
    var queryURL;

    if ($("#searchChoice").val() === "multi") {
        queryURL = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy"
    }
    else {
        queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
    }


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
        });

        //search for movies in the utelly api to pull the watch providers
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
            method: "GET",
            headers: {
                "x-rapidapi-key": "8b595659e5msh577c7ebae66487cp1fe1b8jsnb6613348d882",
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
            }
        })
            .then(function (response) {
                console.log(response);
                for(var i = 0; i < response.results.length; i++){
                    console.log(response.results[i].external_ids.imdb.id)
                    var imdbID =  response.results[i].external_ids.imdb.id;
                    
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + imdbID + "&source=imdb&country=us",
                        method: "GET",
                        headers: {
                            "x-rapidapi-key": "8b595659e5msh577c7ebae66487cp1fe1b8jsnb6613348d882",
                            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
                        }
                    })
                    .then(function (response){
                        console.log(response);
                    });


                }
            });


});
