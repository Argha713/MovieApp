const API_KEY = 'api_key=c66a5e11acc7d54340b36280b14e35b0'
const Base_Url = 'https://api.themoviedb.org/3'
const Api_Url = Base_Url + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const Img_Url = 'https://image.tmdb.org/t/p/w500';
const Search_Url = Base_Url+'/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(Api_Url);


function getMovies(url) {
    console.log(url);
    fetch(url).then(res => res.json()).then(data=>{
        console.log(data);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const{title,poster_path, vote_average, overview} = movie;
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML=`
        <img src="${Img_Url+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>        
        `
        console.log(movieCard.innerHTML);
        main.appendChild(movieCard);
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