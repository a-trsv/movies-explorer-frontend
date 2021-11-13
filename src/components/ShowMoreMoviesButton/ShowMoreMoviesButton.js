import React from 'react';
import { useLocation } from 'react-router-dom';

import './ShowMoreMoviesButton.css'

function ShowMoreMoviesButton() {
    const { pathname } = useLocation();
    const buttonTitle = `${pathname === '/movies' ? 'Ещё' : ''}`

    return (
        <div className="show-more-movies">
            <button className="show-more-movies__button">{buttonTitle}</button>
        </div>
    )
}

export default ShowMoreMoviesButton;