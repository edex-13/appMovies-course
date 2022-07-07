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

const lazyLoader = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { src, alt } = entry.target.dataset;
      entry.target.setAttribute("src", src);
      entry.target.setAttribute("alt", alt);
    }
  });
});

//  DOM

const createMovies = (movies, nodo, clean = true) => {
  if (clean) {
    nodo.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("data-alt", movie.title);
    movieImg.setAttribute(
      "data-src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    lazyLoader.observe(movieImg);

    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`
      );
    });

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

const getTrendingMovies = async () => {
  const { data } = await api(`/trending/movie/day`);
  const movies = data.results;
  totalPages = data.total_pages;

  createMovies(movies, genericSection);
};

const getPaginatedTrendingMovies = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrrollIsAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
  const pageIsNotMax = page <= totalPages;
  if (scrrollIsAtBottom && pageIsNotMax) {
    page++;
    const { data } = await api(`/trending/movie/day`, {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection, false);
  }
};

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
  totalPages = data.total_pages;


  createMovies(movies, genericSection);
};

const getPaginatedMoviesByCategory = (categoryId) => {
  const closure = async () => {
    console.log("hola");
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrrollIsAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
    const pageIsNotMax = page <= totalPages;

    if (scrrollIsAtBottom && pageIsNotMax) {
      page++;
      const { data } = await api(`discover/movie`, {
        params: {
          with_genres: categoryId,
          page,
        },
      });

      const movies = data.results;

      createMovies(movies, genericSection , false);
    }
  };
  return closure;
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

const getMovieDetails = async (movieId) => {
  const { data: movie } = await api(`movie/${movieId}`, {
    params: {
      language: "es-CO",
    },
  });
  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  headerSection.style.background = `
  linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
  url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMovies(movieId);
};

const getRelatedMovies = async (movieId) => {
  const { data } = await api(`movie/${movieId}/similar`, {
    params: {
      language: "es-CO",
    },
  });

  const movies = data.results;

  createMovies(movies, relatedMoviesContainer);
};
