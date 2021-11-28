import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className="navigation">
            <ul className="navigation__list">
                <li className="navigation__list-items">
                    <Link to='/movies' className="navigation__link navigation__link_movies">Фильмы</Link>
                </li>
                <li className="navigation__list-items">
                    <Link to='/saved-movies' className="navigation__link navigation__link_saved-movies">Сохранённые фильмы</Link>
                </li>
            </ul>
        </div>

    )
}

export default Navigation;