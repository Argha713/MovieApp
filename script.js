const API_KEY = 'api_key=c66a5e11acc7d54340b36280b14e35b0'
const Base_Url = 'https://api.themoviedb.org/3'
const Api_Url = Base_Url + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const Img_Url = 'https://image.tmdb.org/t/p/w500';
const Search_Url = Base_Url+'/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const genreTagElement =  document.getElementById('tags');
const priviousPageElement = document.getElementById('privious');
const currentPageElement = document.getElementById('current');
const nextPageElement = document.getElementById('next');



var currentPage = 1;
var nextPage = 2;
var priviousPage = 1;
var lastUrl = '';
var totalPages = 100;

var selectedGenreArr = [];
const genreArr = [
    {
    "id": 28,
    "name": "Action"
    },
    {
    "id": 12,
    "name": "Adventure"
    },
    {
    "id": 16,
    "name": "Animation"
    },
    {
    "id": 35,
    "name": "Comedy"
    },
    {
    "id": 80,
    "name": "Crime"
    },
    {
    "id": 99,
    "name": "Documentary"
    },
    {
    "id": 18,
    "name": "Drama"
    },
    {
    "id": 10751,
    "name": "Family"
    },
    {
    "id": 14,
    "name": "Fantasy"
    },
    {
    "id": 36,
    "name": "History"
    },
    {
    "id": 27,
    "name": "Horror"
    },
    {
    "id": 10402,
    "name": "Music"
    },
    {
    "id": 9648,
    "name": "Mystery"
    },
    {
    "id": 10749,
    "name": "Romance"
    },
    {
    "id": 878,
    "name": "Science Fiction"
    },
    {
    "id": 10770,
    "name": "TV Movie"
    },
    {
    "id": 53,
    "name": "Thriller"
    },
    {
    "id": 10752,
    "name": "War"
    },
    {
    "id": 37,
    "name": "Western"
    }
]

setGenre();
getMovies(Api_Url);


function setGenre(){
    genreTagElement.innerHTML - '';
    genreArr.forEach(genre=>{
        const divElement = document.createElement('div');
        divElement.classList.add('tag');
        divElement.id = genre.id;
        divElement.innerText = genre.name;
        divElement.addEventListener('click', ()=>{
            if(selectedGenreArr.length == 0){
                selectedGenreArr.push(genre.id);
            }else{
                if(selectedGenreArr.includes(genre.id)){
                    selectedGenreArr.forEach((id, index)=>{
                        if(id == genre.id){
                            selectedGenreArr.splice(index, 1);
                        }
                    })
                }else{
                    selectedGenreArr.push(genre.id);
                }
            }
            console.log(selectedGenreArr);
            getMovies(Api_Url+'&with_genres='+ encodeURI(selectedGenreArr.join(',')));
            highlightSelectedgnere();
        })
        genreTagElement.append(divElement);
    })
}

function highlightSelectedgnere() {

    const tags = document.querySelector('.tag');
    
    for (const child of tags.children) {
        
        child.classList.remove('highlight');
    }

    if (selectedGenreArr.length != 0) {
        selectedGenreArr.forEach(id=>{
            const highlitedTag = document.getElementById(id);
            highlitedTag.classList.add('highlight');
            console.log('add');
        })
    }
}


function getMovies(url) {
    console.log(url);
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data=>{
        if(data.results.length !=0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            priviousPage = currentPage - 1;
            totalPages = data.total_pages;

            currentPageElement.innerText = currentPage;
            if(currentPage<=1){
                priviousPageElement.classList.add('disabled');
                nextPageElement.classList.remove('disabled');
            }else if(currentPage >= totalPages){
                priviousPageElement.classList.remove('disabled');
                nextPageElement.classList.add('disabled');
            }else{
                priviousPageElement.classList.remove('disabled');
                nextPageElement.classList.remove('disabled');
            }
            search.scrollIntoView({behavior:'smooth'});
        }else{
            main.innerHTML = `<h1 class="no-results">No Result Found</h1>`
        }
        
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const{title,poster_path, vote_average, overview, id} = movie;
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML=`
        <img src="${poster_path? Img_Url + poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/>
                <button class="know-more" id=${id} >Know More</button>
            </div>        
        `
        main.appendChild(movieCard);

        document.getElementById(id).addEventListener('click', ()=>{
            console.log(id);
            openNav();
        })
    });
}


function getColor(vote) {
    if (vote>=8) {
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(Search_Url+'&query='+searchTerm);
    }else{
        getMovies(Api_Url);
    }
})


nextPageElement.addEventListener('click', ()=>{
    if(nextPage <= totalPages){
        pageCall(nextPage);
    }
})

priviousPageElement.addEventListener('click', ()=>{
    if(priviousPage > 0){
        pageCall(priviousPage);
    }
})

function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let pageParams = queryParams[queryParams.length - 1].split('=');
    
    if(pageParams[0] != 'page'){
        let url = lastUrl + '&page=' + page;
        getMovies(url);
    }else{
        pageParams[1] = page.toString();
        let paginationUrl = pageParams.join('=');
        queryParams[queryParams.length - 1] = paginationUrl;
        let queryParamUrl = queryParams.join('&');
        let url = urlSplit[0] +'?'+ queryParamUrl;
        getMovies(url); 
    }
}


/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }