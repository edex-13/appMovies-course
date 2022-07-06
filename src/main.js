const API_KEY = "d9c98bb6ba0ef4c6777472015756b029";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
//  DOM

const createMovies = (movies, nodo) => {
  nodo.innerHTML = "";

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
    nodo.appendChild(movieContainer);
  });
};

const createCategories = (categories, nodo) => {
  nodo.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    nodo.appendChild(categoryContainer);
  });
};

// API

const getTrendingMoviesPreview = async () => {
  const { data } = await api(`/trending/movie/day`);
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
};

const getCategoriesPreview = async () => {
  const { data } = await api(`/genre/movie/list`, {
    params: {
      language: "es-CO",
    },
  });
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
};

const getMoviesByCategory = async (categoryId) => {
  const { data } = await api(`discover/movie`, {
    params: {
      with_genres: categoryId,
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
};

const getMoviesBySearch = async (query) => {
  const { data } = await api(`search/movie`, {
    params: {
      query,
      language: "es-CO",
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
};
