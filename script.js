// API URL for retrieving popular movies
const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
// Base URL for movie poster images
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
// API URL for searching movies
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// Get reference to HTML elements
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

// Fetch initial movies when the page loads
getMovies(API_URL)

// Function to fetch movies from the API
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    // Pass the retrieved movie data to the showMovies function
    showMovies(data.results)
}

// Function to display movies on the page
function showMovies(movies) {
    // Clear the main element
    main.innerHTML = ""

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        // Create a movie element
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        // Set the HTML content of the movie element
        movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `

        // Append the movie element to the main element
        main.appendChild(movieEl)
    })
}

// Function to determine the CSS class based on the vote average
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

// Event listener for the form submit event
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== "") {
        // If a search term is entered, fetch movies based on the search term
        getMovies(SEARCH_API + searchTerm)

        // Clear the search input value
        search.value = ""
    } else {
        // If no search term is entered, reload the page to display the initial popular movies
        window.location.reload()
    }
})
