const trendsPage = () => {
  console.log("trends");
};
const searchPage = () => {
  console.log("search");
};
const movieDetailsPage = () => {
  console.log("movie");
};

const categoriesPage = () => {
  console.log("category");
};
const homePage = () => {
  getTrendingMoviesPreview();
  getCategoriesPreview();
};

const navigator = () => {
  const { hash: HASH_URL } = location;
  HASH_URL.startsWith('#trends')    ? trendsPage()       :
  HASH_URL.startsWith('#search=')   ? searchPage()       :
  HASH_URL.startsWith('#movie=')    ? movieDetailsPage() :
  HASH_URL.startsWith('#category=') ? categoriesPage()   :
  homePage()
};
window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);

