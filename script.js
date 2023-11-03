// -------------------- FETCH API --------------------

const buttonSearch = document.querySelector(".button-search");
buttonSearch.addEventListener("click", async function () {
  try {
    const keywordSearch = document.querySelector(".keyword-search");
    const movies = await getMovies(keywordSearch.value);
    movieCards(movies);
  } catch (err) {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.innerHTML = displayError(err);
  }
});

function getMovies(moviesValue) {
  return fetch("http://www.omdbapi.com/?apikey=6f3c4083&s=" + moviesValue)
    .then((response) => {
      // if api key wrong
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

// binding event for show detail
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("button-detail")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    showMovieDetail(movieDetail);
  }
});

function movieCards(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += displayCards(m);
  });
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = cards;
}

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=6f3c4083&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function showMovieDetail(m) {
  const detail = displayMovieDetail(m);
  const modalBodyDetail = document.querySelector(".modal-body");
  modalBodyDetail.innerHTML = detail;
}

function displayCards(m) {
  return `<div class="col-md-3 mx-3 my-3">
                  <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                      <a href="#" class="btn btn-secondary btn-sm button-detail" data-imdbid=${m.imdbID} data-bs-toggle="modal" 
                      data-bs-target="#movies-modal" >Details</a>
                    </div>
                  </div>
                </div>`;
}

function displayMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img class="img-fluid" src="${m.Poster}">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Title : </strong>${m.Title}</li>
                  <li class="list-group-item"><strong>Year : </strong>${m.Year}</li>
                  <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                  <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                  <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                  <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`;
}

function displayError(err) {
  return `<div class="alert alert-danger" role="alert">
            ${err}
          </div>`;
}


// Get
// -------------------- JQUERY --------------------
// $(".button-search").click(function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=6f3c4083&s=" + $(".keyword-search").val(),
//     success: (res) => {
//       const movies = res.Search;
//       let cards = "";
//       movies.forEach((movie) => {
//         cards += displayCards(movie);
//       });
//       $(".cards-container").html(cards);
//       $(".button-detail").click(function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=6f3c4083&i=" +
//             $(this).data("imdbid"),
//           success: (movieDetails) => {
//             const detail = displayMovieDetail(movieDetails);
//             $(".modal-body").html(detail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     // save cards inside cards-container in html
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// function displayCards(movie) {
//   return `<div class="col-md-3 mx-3 my-3">
//                   <div class="card">
//                     <img src="${movie.Poster}" class="card-img-top" alt="...">
//                     <div class="card-body">
//                       <h5 class="card-title">${movie.Title}</h5>
//                       <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
//                       <a href="#" class="btn btn-secondary btn-sm button-detail" data-imdbid=${movie.imdbID} data-bs-toggle="modal"
//                       data-bs-target="#movies-modal" >Details</a>
//                     </div>
//                   </div>
//                 </div>`;
// }

// function displayMovieDetail(movieDetails) {
//   return `<div class="container-fluid">
//             <div class="row">
//               <div class="col-md-3">
//                 <img class="img-fluid" src="${movieDetails.Poster}">
//               </div>
//               <div class="col-md">
//                 <ul class="list-group">
//                   <li class="list-group-item"><strong>Title : </strong>${movieDetails.Title}</li>
//                   <li class="list-group-item"><strong>Year : </strong>${movieDetails.Year}</li>
//                   <li class="list-group-item"><strong>Director : </strong>${movieDetails.Director}</li>
//                   <li class="list-group-item"><strong>Genre : </strong>${movieDetails.Genre}</li>
//                   <li class="list-group-item"><strong>Actors : </strong>${movieDetails.Actors}</li>
//                   <li class="list-group-item"><strong>Plot : </strong>${movieDetails.Plot}</li>
//                 </ul>
//               </div>
//             </div>
//           </div>`;
// }


