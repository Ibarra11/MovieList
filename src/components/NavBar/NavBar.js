import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            movieListName: ''
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

    render() {
        return (
            <nav className="side-nav">
                <div className="nav-section side-nav-search">
                    <h3>Search For Movies</h3>
                    <input onChange={(e) => this.handleInputChange(e.target.value)} className="input-search" placeholder="Search for a movie" type="text" />
                    <button onClick={() => this.props.movies(this.state.searchTerm)} >Search</button>
                </div>
                <div className=" nav-section side-nav-create">
                    <h3>MovieList</h3>
                    <input value={this.state.movieListName} onChange={(e) => this.handleMovieName(e.target.value)} placeholder="Enter a MovieList Name" type="text" />
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