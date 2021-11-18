import './MoviesCardIconHandler.css';
import React from 'react';

import { ReactComponent as RemoveFromSavedIcon } from '../../images/delete-movie.svg';
import { ReactComponent as SavedMovieIcon } from '../../images/saved-movie-icon.svg';

function MoviesCardIconHandler({
    onClick,
    pageLocation,
    isSaved
}) {
    const className = (
        `movies-card__icon ${pageLocation === '/saved-movies' ? 'movies-card__icon_delete' : pageLocation === '/movies' && isSaved ? 'movies-card__icon_saved' : ''}`
    )
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {pageLocation === '/saved-movies' ? (
                <RemoveFromSavedIcon />
            ) : pageLocation === '/movies' && isSaved ? (
                <SavedMovieIcon />
            ) : (
              `Сохранить`
            )}
        </button>
    )
}

export default MoviesCardIconHandler;