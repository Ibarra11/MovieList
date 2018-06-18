const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3001;

const mc = require('../controllers/movies_controller');


app.use(bodyParser.json());

const API_KEY = 'd43e471eb94c857ad73330205c6c8d6b';

const BASE_URL = 'https://api.themoviedb.org/3/';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d43e471eb94c857ad73330205c6c8d6b&language=en-US&page=1&include_adult=false';
const POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=d43e471eb94c857ad73330205c6c8d6b&language=en-US&page=1';
const IMG = 'https://image.tmdb.org/t/p/w200';



app.get('/movies/api/', (req, response) => {
    // req.query.get determines whether to get movielist or to get the  movies
    if (req.query.get === 'movielist') {
        response.send(mc.retrieveAllMovieList())
    }
    else {
        mc.emptyMovieArray();
        axios.get(`${BASE_URL}search/movie?query=${req.query.get}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`)
            .then(res => {
                res.data.results.forEach(movie => {
                    mc.getSearchedMovies(movie);
                })
                response.send(mc.retrieveMovies());
            })
            .catch(err => console.log(err))
    }

})

app.get('/movies/api/:movieCategory', (req,res) =>{
    mc.emptyMovieArray();
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d43e471eb94c857ad73330205c6c8d6b&language=en-US&page=1')
    .then(movies =>{
        movies.data.results.forEach(movie =>{
            mc.getSearchedMovies(movie);
        })
        res.send(mc.retrieveMovies());
    })
    .catch(err => console.log(err))
})

app.get('/movies/api/actor/name', (req,res) =>{
    mc.emptyMovieArray();
    axios.get(`${BASE_URL}search/person?api_key=${API_KEY}&language=en-US&query=${req.query.name}&page=1&include_adult=false`)
    .then(movies =>{
        movies.data.results.forEach((movie,index) =>{
            mc.getMoviesByActor(movie.known_for);
        })
        res.send(mc.retrieveMovies());
    })
    .catch(err => console.log(err));
})



app.post('/movies/api', (req, res) => {
    if (req.body.name) {
        mc.createNewMovieList(req.body.name);
        res.send(mc.retrieveAllMovieList());
    }
    else if(req.body.newMovie){
        mc.addMovieToMovieList(req.body.newMovie)
        res.send(mc.retrieveAllMovieList())
    }
})

app.delete('/movies/api/:id/:movieList', (req,res) =>{
    mc.deleteMovieFromMovieList(req.params.id, req.params.movieList);
    res.send(mc.retrieveAllMovieList());;
})


app.listen(3001, () => console.log('Listening'))



