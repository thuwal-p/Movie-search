

const params = new URLSearchParams(window.location.search)
const query = params.get('query')
const details = document.querySelector('#details')

async function loadMovie(){
    //console.log('loadMovie started, query is:', query)

    if(!query) {
        details.textContent = 'No movie searched. Go back and try again'//prints a plane message onto screen
        return
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    const response = await fetch(url)
    const data = await response.json()
    
    if(data.results.length === 0){//data.results is the list of matching movies
        details.textContent = `No movie found for "${query}"`
        return 
    }

    showMovie(data.results[0])//picks the first best match
}
    function showMovie(movie){
        const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : ' '
        
        details.innerHTML = `
        <img class="movie-poster" src="${poster}" alt="${movie.title}">
        <div class="movie-info">
            <h2>${movie.title} (${movie.release_date.slice(0, 4)})</h2>
            <p> ${movie.vote_average.toFixed(1)} / 10 (${movie.vote_count} votes)</p>
            <p>${movie.overview || 'No summary available.'}</p>
        </div>
        `
    }
    loadMovie()
