const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');


var lastUrl = '';
var totalPages = 10;


getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date, id} = movie;
        const skilmovie = document.createElement('div');
        skilmovie.classList.add('movie');
        skilmovie.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="skilmovie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
                
            </div >
            <div class="skilmovie-info">
            <span>${release_date}</span>
            </div>
            <div class="overview">
                <br/> 
                <p id="${id}"></p>
            </div>
        
        `

        main.appendChild(skilmovie);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}