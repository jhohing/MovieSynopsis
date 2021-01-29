//ID for the movie 
var search = document.querySelector("#search");
var movieTitle = document.querySelector("#movieTitle");
var moviePlot = document.querySelector("#moviePlot");
var movieGenre = document.querySelector("#movieGenre");
var movieRelease = document.querySelector("#movieRelease");
var movieRuntime = document.querySelector("#movieRuntime");
var movieImages = document.querySelector("#movieImages")
var movieRate = document.querySelector("#movieRate");

$("#search").on("click", function(event) {

    event.preventDefault();

    var movie = $("#movieName").val();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";


    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
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
  });