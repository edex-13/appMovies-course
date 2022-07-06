searchFormBtn.addEventListener('click', ()=>{
  location.hash = "#search=" + searchFormInput.value;
})
trendingBtn.addEventListener('click', ()=>{
  location.hash = "#trends"
})
arrowBtn.addEventListener('click', ()=>{
  history.back()
})
const trendsPage = () => {
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerText= "Tendencias";
  getTrendingMovies();
};
const searchPage = () => {

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  

  const { hash: HASH_URL } = location;
  const [_,query] = HASH_URL.split('=')
  getMoviesBySearch(decodeURI(query))
};
const movieDetailsPage = () => {
  console.log("movie");

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
};

const categoriesPage = () => {
  console.log("category");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const { hash: HASH_URL } = location;
  const [_,categoryDataUrl] = HASH_URL.split('=')
  const [categoryId, categoryName] = categoryDataUrl.split('-')
  headerCategoryTitle.innerText= decodeURI(categoryName);
  getMoviesByCategory(categoryId);
};
const homePage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

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

  window.scrollTo( 0 ,0);
};
window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);

