// import { fetchMovieInfo } from './utils.js';

const listEl = document.getElementById("movie-list")

let watchList = JSON.parse(localStorage.getItem('watchList'))
if (watchList===null || watchList===undefined) {
    watchList=[]
}

function addWatchlistHandler(event) {
    console.log(`Clicked remove from watchlist at movie with imdbID: ${event.target.dataset.imdbid}!`)
    let clickedMovie = watchList.findIndex(item => item.imdbID===event.target.dataset.imdbid)
    console.log(clickedMovie)
    if(clickedMovie==undefined) {
        console.log("Something went wrong!")
    } else {
        console.log("Deleting movie at index: "+clickedMovie)
        watchList.splice(clickedMovie, 1)
        
        localStorage.setItem('watchList', JSON.stringify(watchList));
        render()
    }
    

}

function render() {
    
    console.log(watchList)
    const html = watchList.map( item => {
        return `
        <div class="list-item">
            <img src="${item.Poster}">
            <div class="movie-info-container">
                <div class="title">${item.Title} (${item.Year}) <span class="imdb-rating"><span class="star-symbol">✭</span>${item.imdbRating}</span></div>
                <div class="info"> 
                    <span>${item.Runtime}</span>
                    <span>${item.Genre}</span>
                    <button onclick="addWatchlistHandler(event)" data-imdbid="${item.imdbID}" class="add-watchlist-btn"><img src="images/icon-minus.svg">Remove</button>
                </div>
                <p class="plot">${item.Plot}</p>

            </div>
        </div>
        `
    }).join("")
    listEl.innerHTML=html
    
}

render()

