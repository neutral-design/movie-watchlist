// import { fetchMovieInfo } from './utils.js';

let watchList = JSON.parse(localStorage.getItem('watchList'))
if (watchList===null || watchList===undefined) {
    watchList=[]
}

let searchResults = []

const listEl = document.getElementById("movie-list")
const searchField = document.getElementById("search-field")
const searchBtn = document.getElementById("search-btn")

let searchTitle = ""

searchBtn.addEventListener("click", searchEventHandler)
searchField.addEventListener("keypress", event => {
    if(event.key==="Enter") {
        searchEventHandler(event)
    }
})

function addWatchlistHandler(movieid) {
    // console.log(`Clicked add to watchlist on imdb-id: ${movieid}!`)
    let clickedMovie = searchResults.find(item => item.imdbID===movieid)
    // console.log(clickedMovie)
    if(clickedMovie==undefined) {
        console.log("Something went wrong!")
    } else {
        watchList.push(clickedMovie)
        localStorage.setItem('watchList', JSON.stringify(watchList));
    }
    

}

function searchEventHandler(event) {
    searchTitle = searchField.value
    if(searchTitle) {
        fetch(`https://www.omdbapi.com/?apikey=f58da016&s=${searchTitle}&plot=full&type=movie`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                
                if(data.Response==="True") {


                    Promise.all(data.Search.map( movie => {
                        // console.log(movie)
                        const movieInfo = fetchMovieInfo(movie.imdbID)
                        return movieInfo

                    })).then(values => {
                        // console.log(values)
                        searchResults=values
                        const html = values.map( item => {
                            
                            return `
                            <div class="list-item">
                                <img src="${item.Poster}">
                                <div class="movie-info-container">
                                    <div class="title">${item.Title} (${item.Year}) <span class="imdb-rating"><span class="star-symbol">✭</span>${item.imdbRating}</span></div>
                                    <div class="info"> 
                                        <span>${item.Runtime}</span>
                                        <span>${item.Genre}</span>
                                        <button onclick="addWatchlistHandler('${item.imdbID}')" class="add-watchlist-btn"><img src="images/plus-icon.svg">Watchlist</button>
                                    </div>
                                    <p class="plot">${item.Plot}</p>

                                </div>
                            </div>
                            `
                        }).join("")
                        listEl.innerHTML=html
        
                    })
                    
                    

                }
                else {
                    listEl.innerHTML=`
                    <p>${data.Error}</p>`
                }

            })
    }
}

async function fetchMovieInfo(imdbId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=f58da016&i=${imdbId}&plot=full`)
    const data = await response.json()  
    
    return data
    
}