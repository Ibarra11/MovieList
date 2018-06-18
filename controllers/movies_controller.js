let movieArray = [];
let movieList = []

module.exports = {
    retrieveMovies: () => movieArray,
    getSearchedMovies: ({title, id, poster_path, overview, vote_average}) =>{
        if(poster_path != null){
            movieArray.push({movieTitle: title, movieId: id, movieImg: 'https://image.tmdb.org/t/p/w200'+ poster_path, overview: overview});
        }
        return movieArray;
    },
    getMoviesByActor: (movie) =>{
        movie.forEach(movie =>{
            movieArray.push({title: movie.title, movieId: movie.id, movieImg: 'https://image.tmdb.org/t/p/w200' + movie.poster_path, overview: movie.overview })
        })
    },
    emptyMovieArray: () =>{
        movieArray = [];
    },
    deleteMovieFromMovieList: (movieId, movieListName) =>{
        for(let i = 0; i < movieList.length; i++){
            if(movieList[i].title == movieListName){
                for(let j = 0; j < movieList[i].movies.length; j++){
                    if(movieList[i].movies[j].movieId === +movieId){
                        movieList[i].movies.splice(j,1);
                    }
                }
            }
        }
    },
    createNewMovieList: (movieListName) =>{
        movieList.push({title: movieListName, movies: []})
    },
    retrieveAllMovieList: () => {
        return movieList;
    },
    addMovieToMovieList: (newMovieList) =>{
        movieList =  newMovieList;
    }
}