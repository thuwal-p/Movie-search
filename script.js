

const searchInput = document.querySelector('.search-bar input')
const search = document.querySelector('.search-bar form')
const movieGrid = document.querySelector('#movie-grid')

async function loadPopMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data.results.slice(0, 10))
}

function showMovies(movies) {
    console.log('showMovies ran with', movies.length, 'movies')
    movieGrid.innerHTML = ''

    movies.forEach(movie => {
        console.log('making poster for:', movie.title, movie.poster_path)

        if (!movie.poster_path) return

        const box = document.createElement('div')
        box.classList.add('box')
        box.innerHTML = `
    <a href="movie.html?query=${encodeURIComponent(movie.title)}">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" width="150" alt="${movie.title}">
    </a>
`
        movieGrid.appendChild(box)
    })
}

loadPopMovies()

search.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()
    if(!query) return
    window.location.href = `movie.html?query=${encodeURIComponent(query)}`
})

