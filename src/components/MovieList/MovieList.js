import React from 'react';
import './MovieList.css';
const MovieList = ({ movieList, deleteMovieFromMovieList }) => {
    return (
        movieList.map((e, i) => {
            return (
                <div key={i} className="movie-list-container ">
                    <h3 className="movie-list-header">{e.title}</h3>
                    <div className="movie-list-card-container">
                        {
                            e.movies.map((movie, index) => {
                                console.log(movie);
                                return <div key={movie + index} className=" card movie-list-card">
                                    <div className="movie-list-card-img">
                                        <img className="movie-list-img" src={movie.movieImg} alt="" />
                                        <h4 className="movie-list-card-title">{movie.movieTitle}</h4>
                                        <h5>Overview</h5>
                                    </div>
                                    <div className="movie-list-card-details">
                                        <p>{movie.movieOverview}</p>
                                    </div>
                                    <div className="movie-list-card-delete">
                                        <button onClick={() => deleteMovieFromMovieList(e.title, movie.movieId)} className="delete-movie">Delete From Movielist</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            )
        })
    )

}



export default MovieList;