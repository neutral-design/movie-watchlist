async function fetchMovieInfo(imdbId) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=f58da016&i=${imdbId}&plot=full`)
    const data = await response.json()  
    
    return data
    
}

export { fetchMovieInfo };