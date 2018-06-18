import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            movieListName: '',
            actorName: ''
        }
    }

    handleInputChange = (val) => {
        this.setState({
            searchTerm: val
        })
    }

    handleMovieName = (val) => {
        this.setState({ movieListName: val })
    }

    handleActorChange = (val) => {
        this.setState({ actorName: val })
    }

    render() {
        return (
            <nav className="side-nav">
                <div className="nav-section side-nav-search">
                    <h3>Search For Movies</h3>
                    <div className="input-search">
                        <input onChange={(e) => this.handleInputChange(e.target.value)} className="input-search" placeholder="Search for a movie" type="text" />
                        <button onClick={() => this.props.movies(this.state.searchTerm)} >Search By Movie</button>
                    </div>
                    <div className="input-search">
                        <input placeholder="Enter actors name" onChange={e => this.handleActorChange(e.target.value)} className="input-search" type="text" />
                        <button onClick={() => this.props.actorSearch(this.state.actorName)}>Search By Actor</button>
                    </div>
                    <div>
                        <button className="popular-movies" onClick={() => this.props.displayPopularMovies()}>Popular Movies</button>
                    </div>

                </div>
                <div className=" nav-section side-nav-create">
                    <h3>MovieList</h3>
                    <input className="movielist-search" value={this.state.movieListName} onChange={(e) => this.handleMovieName(e.target.value)} placeholder="Enter a MovieList Name" type="text" />
                    <button className="movieList-button" onClick={() => this.props.newMovieList(this.state.movieListName)}>Create MovieList</button>
                    <div className="movie-list-view">
                        <button onClick={() => this.props.displayMovieList()}>View MovieList</button>
                    </div>
                </div>


            </nav>
        )
    }
}

export default NavBar;