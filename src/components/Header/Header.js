import React, {Component} from 'react';
import './Header.css';
class Header extends Component {

    render() {
        return (
            <header>
                <div className="header-text">
                    <h1>MovieList</h1>
                    <h2>Create a Playlist of Your Favorite Movies</h2>
                </div>
            </header>
        )
    }

}
export default Header;