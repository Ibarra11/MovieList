import React, { Component } from 'react';
import './Movie.css';
class Movie extends Component {
    constructor() {
        super();
        this.state = {
            selectedMovieList: ''
        }
    }
    handleMovieListChange = (val) => {
        this.setState({ selectedMovieList: val })
    }
    render() {
        return (
            <div className="card movie-card">
                <div className="movie-card-img-container">
                    <img className="movie-card-img" src={this.props.movieImg} alt="" />
                </div>
                <div className="movie-card-info">
                    <div className="movie-card-details">
                        <h5 className="movie-card-title">{this.props.movieTitle}</h5>
                        <h5>Overview</h5>
                        <div className="movie-card-overview">
                            <p className="card-overview-text">{this.props.movieOverview}</p>
                        </div>
                    </div>
                    <div className="movie-add-list">
                        <h5>MovieList</h5>
                        <select onChange={(e) => this.handleMovieListChange(e.target.value)} className="movie-list-select" name="" id="">
                            <option selected disabled value="">Select a MovieList</option>
                            {this.props.movieList.map((e, i) => {
                                return <option key={e + i} value={e.title}>{e.title}</option>
                            })}
                        </select>
                        <button onClick={() => this.props.addMovieToMovieList(this.props, this.state.selectedMovieList)} className="movie-card-add-button"> Add To Movielist</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;