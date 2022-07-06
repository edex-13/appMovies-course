const API_KEY = "d9c98bb6ba0ef4c6777472015756b029";

const getTrendingMoviesPreview = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await response.json();

  const movies = data.results;

  const trendingPreviewMoviesContainer = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
};

getTrendingMoviesPreview();
