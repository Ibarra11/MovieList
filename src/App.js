import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import MovieArray from './components/MovieArray/MovieArray';
import MovieList from './components/MovieList/MovieList';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      movieList: [],
      searchResults: true,
    }
  }
  /*
                                  GetMovies()
    This method retrieves movies based on the users input.  This method is called when the user clicks
    on the search button, which is in the NavBar component. It makes a get request to the server and returns an array
    of object, which contain movies information.  I also change searchReults to true because i am doing conditional rendering
    in the movieList div.
  */
  getMovies = searchTerm => {
    axios.get(`/movies/api?get=${searchTerm}`)
      .then(res => this.setState({
        movies: res.data,
        searchResults: true,
      }))
      .catch(err => console.log(err))
  }

  displayPopularMovies = () =>{
    axios.get('/movies/api/popular')
    .then(res => this.setState({
      movies: res.data,
      searchResults: true
    }))
    .catch(err => console.log(err))
  }

  displayMoviesByActor = actorName =>{
    axios.get('movies/api/actor/name?name=' + actorName)
    .then(res => this.setState({
      movies: res.data,
      searchResults: true
    }) )
  }

  /*
                                  CreateNewMovieList()
    This method creates a movielist name.  It is called when teh user clicks on the create MovieList button.  I pass this method
    down to the NavBar component.  I then makes a post request to the server, which returns an array of objects in the form
    [{title: movieListName: movies: [arrayof movies]}].  The object has a title property which is the movieList name and it has a movies property which is an array of objects.  Each object in the movies property is information on one movie.  
  */
  createNewMovieList = (movieListName) => {
    axios.post('/movies/api', { name: movieListName })
      .then(res => this.setState({ movieList: res.data }))
      .catch(err => console.log(err))
  }

  /*
                                displayMovieList()
  This method returns each movieList.  It is called when the MovieList button is clicked, which is the NavBar child component.
  It returns an array of objects in the form [{title: movieListTitle, movies: [{movie},{movie}]}].  It then changes the state of
  the movieList array and it also changes searchResults state to false, which means that the movieList will be rendered insead of the
  movies from user input.
  */
  displayMovieList = () => {
    axios.get('/movies/api?get=movielist')
      .then(res => this.setState({
        movieList: res.data,
        searchResults: false
      }))
      .catch(err => console.log(err))
  }

  /*
                                  deleteMovieFromMovieList
    This is going to remove a movie from one of the movielist.  It takes the movieList from which the movie is going to be removed from and it takes the movieId that is going to be removed.  This method is passed to the MovieList component and is called when
    the user clicks on the delete from movieList button. 
  */
  deleteMovieFromMovieList = (movieList, movieId) =>{
    axios.delete(`/movies/api/${movieId}/${movieList}`)
    .then(res => this.setState({movieList: res.data}))
    .catch(res => console.log(res))
  }
  /*
                                        addMovieToMovieList()
    This method is going to add a movie to a movieList.  It takes the id of the movie as movieId, the src of the img as movieImg,
    the overview of the movie as movieOverview, and it takes the title of the movie as movieTitle.  It also takes movieList arguement
    as the name of the movieList where the movie is going to be added.
  */
  addMovieToMovieList = ({ movieId, movieImg, movieOverview, movieTitle }, movieList) => {
    let tempMovie = this.state.movieList;
    for (let i = 0; i < this.state.movieList.length; i++) {
      if (this.state.movieList[i].title == movieList) {
        tempMovie[i].movies.push({ movieId, movieImg, movieOverview, movieTitle })
      }
    }
    axios.post('/movies/api', { newMovie: tempMovie })
      .then(res => console.log(res))
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="main">
          <NavBar actorSearch ={(actorName) => this.displayMoviesByActor(actorName)} displayPopularMovies= {() => this.displayPopularMovies()} displayMovieList={() => this.displayMovieList()} newMovieList={(name) => this.createNewMovieList(name)} movies={(searchTerm) => this.getMovies(searchTerm)} />
          <div className="movie-list">
            {
              this.state.searchResults ? <MovieArray addMovieToMovieList={(obj, movieList) => this.addMovieToMovieList(obj, movieList)} movieList={this.state.movieList} movies={this.state.movies} /> : <MovieList deleteMovieFromMovieList={(title, id) => this.deleteMovieFromMovieList(title,id) } movieList={this.state.movieList} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
