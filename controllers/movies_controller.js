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
    emptyMovieArray: () =>{
        movieArray = [];
        console.log(movieArray);
    },
    deleteMovieFromMovieList: (movieId, movieListName) =>{
        for(let i = 0; i < movieList.length; i++){
            if(movieList[i].title == movieListName){
                for(let j = 0; j < movieList[i].movies.length; j++){
                    console.log(movieList[i].moviesId);
                    if(movieList[i].movies[j].movieId === +movieId){
                        movieList[i].movies.splice(j,1);
                    }
                }
            }
        }
        console.log(movieList);
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