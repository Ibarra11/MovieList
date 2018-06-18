import React from 'react';
import Movie from './Movie/Movie';


const MovieArray = ({ movies, movieList, addMovieToMovieList }) => {
        
        return movies.map((movie, i) => {
            return (
                <Movie key={movie + i}
                    movieId={movie.movieId}
                    movieImg={movie.movieImg}
                    movieOverview={movie.overview}
                    movieTitle={movie.movieTitle}
                    movieList={movieList}
                    addMovieToMovieList={addMovieToMovieList} />
            )

        })
    
}

export default MovieArray;