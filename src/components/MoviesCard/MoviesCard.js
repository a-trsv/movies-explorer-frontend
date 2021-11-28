import React from 'react';
import './MoviesCard.css';
import { ReactComponent as RemoveFromSavedIcon } from '../../images/delete-movie.svg';
import { ReactComponent as SavedMovieIcon } from '../../images/saved-movie-icon.svg';

function MoviesCard({
    filteredMovie, 
    handleToggleMovie,
    savedMovies
}) {

    const movieButtonClassName = (
        `movies-card__icon ${filteredMovie.isAlreadyAdded ? 'movies-card__icon_saved' : ''}`
    )


    function handleToggleButton() {
        handleToggleMovie(filteredMovie)
    }

    return (
        <article className="movies-card" key={filteredMovie._id}>
            <div className="movies-card__description">
                <h4 className="movies-card__movie-title">{filteredMovie.nameRU}</h4>
                <span className="movies-card__movie-duration">{filteredMovie.duration} минут</span>
            </div>
            <a className="movies-card__trailer" target="_blank" rel="noreferrer" href={filteredMovie.trailerLink ? filteredMovie.trailerLink : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
                <img className="movies-card__movie-img" src={savedMovies ? filteredMovie.image : `${'https://api.nomoreparties.co'}${filteredMovie.image ? filteredMovie.image.url : ''}`} alt={filteredMovie.nameRU} />
            </a>
            {
                savedMovies
                    ? <button type="button" className="movies-card__icon movies-card__icon_delete" onClick={handleToggleButton}><RemoveFromSavedIcon /></button>
                    : <button type="button" className={movieButtonClassName} onClick={handleToggleButton}>

                        {filteredMovie.isAlreadyAdded ? (
                            <SavedMovieIcon />
                        ) : (
                            `Сохранить`
                        )}

                    </button>
            }
        </article>
    )
}
export default MoviesCard;