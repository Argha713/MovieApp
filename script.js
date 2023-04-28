const API_KEY = 'api_key=c66a5e11acc7d54340b36280b14e35b0'
const Base_Url = 'https://api.themoviedb.org/3'
const Api_Url = Base_Url + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const Img_Url = 'https://image.tmdb.org/t/p/w500';

getMovies(Api_Url);


function getMovies(url) {
    console.log(url);
    fetch(url).then(res => res.json()).then(data=>{
        console.log(data);
        showMovies(data.results);
    })
}

function showMovies(data) {
    data.array.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML=`
        <img src="" alt="image">
            <div class="movie-info">
                <h3>Movie Title</h3>
                <span class="orange">9.8</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat vitae saepe possimus molestias eum voluptates obcaecati reiciendis, esse recusandae assumenda.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident id assumenda eligendi maxime velit fugiat repellendus earum, nihil animi pariatur.
            </div>        
        `
    });
}
