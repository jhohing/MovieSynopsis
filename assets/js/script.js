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

//Search Result 
$("#search").on("click", function (event) {

  event.preventDefault();
  $("#movieResult").empty();

  var movie = $("#movieName").val();
  var queryURL;
  if ($(`input[type = radio]:checked`).val() === "multi") {
    queryURL = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy";
  }
  else if ($(`input[type = radio]:checked`).val() === "single") {
    queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  }

  //getting the title, genre, plot, image, rate,
  //runtime, and release
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      console.log($(`input[type = radio]:checked`).val());
      //Single Search
      if ($(`input[type = radio]:checked`).val() === "single") {
        var html = `
        <figure>
          <img src="${response.Poster}" alt="${response.Title}"/>
        </figure>
        `;
        var movieTitle = $("<h3>").html(response.Title);
        var movieGenre = $("<h3>").html(response.Genre);
        var moviePlot = $("<p>").html(response.Plot);
        var movieRate = $("<h3>").html(response.Rated);
        var movieRuntime = $("<h3>").html(response.Runtime);
        var movieRelease = $("<h3>").html(response.Released);
        var imdbID = response.imdbID;

        $("#movieResult").append(movieTitle);
        $("#movieResult").append(movieGenre);
        $("#movieResult").append(moviePlot);
        $("#movieResult").append(html);
        $("#movieResult").append(movieRate);
        $("#movieResult").append(movieRuntime);
        $("#movieResult").append(movieRelease);

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
          .then(function (response) {
            console.log(response);
            for (var j = 0; j < response.collection.locations.length; j++) {
              var watchProviders = $("<h3>").html(response.collection.locations[j].display_name + "<br>");
              $("#movieResult").append(watchProviders);
            }
          });
      }
      //Multi Search 
      else if ($(`input[type = radio]:checked`).val() === "multi") {
        //append the results to the page 
        for (var i = 0; i < response.Search.length; i++) {
          console.log(response.Search[i].Title);
          var title = $("<h3>").html(response.Search[i].Title);
          var image = `
        <figure>
          <img src="${response.Search[i].Poster}" alt="${response.Search[i].Title}"/>
        </figure>
        `;
          var year = $("<p>").html(response.Search[i].Year);
          var type = $("<h3>").html("Type: " + response.Search[i].Type);
          $("#movieResult").append(title);
          $("#movieResult").append(year);
          $("#movieResult").append(image);
          $("#movieResult").append(type);
          var imdbID = response.Search[i].imdbID;

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
            .then(function (response) {
              console.log(response);
              for (var j = 0; j < response.collection.length; j++) {
                var watchProviders = $("<h3>").html(response.collection.locations[j].display_name + "<br>");
                $("#movieResult").append(watchProviders);
              }
            });
        }
      }
      // //local storage
      var movieHistory = JSON.parse(localStorage.getItem("Movie")) || [];
      var value = $("#movieName").val();
      movieHistory.push(value);
      localStorage.setItem("Movie", JSON.stringify(movieHistory));
      var movieHist = document.querySelector("#searchHistory")
      var getMovie = JSON.parse(window.localStorage.getItem("Movie")) || [];
      getMovie.sort(function (a, b) {
        return b.movie - a.movie;
      });
      getMovie.forEach(function (movie) {
        var listItem = document.createElement("li");
        listItem.textContent = movie;
        // movieHist.appendChild(listItem);
        movieHist.appendChild(listItem);
      });
    });

  //search for movies in the utelly api to pull the watch providers
  // $.ajax({
  //   async: true,
  //   crossDomain: true,
  //   url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "8b595659e5msh577c7ebae66487cp1fe1b8jsnb6613348d882",
  //     "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
  //   }
  // })
  //   .then(function (response) {
  //     //console.log(response);
  //     for (var i = 0; i < response.results.length; i++) {
  //       console.log(response.results[i].external_ids.imdb.id)
  //       var imdbID = response.results[i].external_ids.imdb.id;

  //       $.ajax({
  //         async: true,
  //         crossDomain: true,
  //         url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + imdbID + "&source=imdb&country=us",
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-key": "8b595659e5msh577c7ebae66487cp1fe1b8jsnb6613348d882",
  //           "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
  //         }
  //       })
  //         .then(function (response) {
  //           console.log(response);
  //           for (var j = 0; j < response.collection.length; j++) {
  //             console.log(response.collection[i].locations[j].display_name);
  //           }
  //         });


  //     }
  //   });

});

function clearHistory() {
  window.localStorage.removeItem("Movie");
  window.location.reload();
}
$("#clear").on("click", function (event) {
  console.log(event.target);
  clearHistory();
});

