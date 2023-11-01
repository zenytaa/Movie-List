// Get Movie
$(".button-search").click(function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=6f3c4083&s=" + $(".keyword-search").val(),
    success: (res) => {
      const movies = res.Search;
      let cards = "";
      movies.forEach((movie) => {
        cards += displayCards(movie);
      });
      $(".cards-container").html(cards);
      $(".button-detail").click(function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=6f3c4083&i=" +
            $(this).data("imdbid"),
          success: (movieDetails) => {
            const detail = +displayMovieDetail(movieDetails);
            $(".modal-body").html(detail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    // save cards inside cards-container in html
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function displayCards(movie) {
  return `<div class="col-md-3 mx-3 my-3">
                  <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${movie.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                      <a href="#" class="btn btn-secondary btn-sm button-detail" data-imdbid=${movie.imdbID} data-bs-toggle="modal" 
                      data-bs-target="#movies-modal" >Details</a>
                    </div>
                  </div>
                </div>`;
}

function displayMovieDetail(movieDetail) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img class="img-fluid" src="${movieDetails.Poster}">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Title : </strong>${movieDetails.Title}</li>
                  <li class="list-group-item"><strong>Year : </strong>${movieDetails.Year}</li>
                  <li class="list-group-item"><strong>Director : </strong>${movieDetails.Director}</li>
                  <li class="list-group-item"><strong>Genre : </strong>${movieDetails.Genre}</li>
                  <li class="list-group-item"><strong>Actors : </strong>${movieDetails.Actors}</li>
                  <li class="list-group-item"><strong>Plot : </strong>${movieDetails.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`;
}
