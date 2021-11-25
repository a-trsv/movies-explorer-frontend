import React from 'react';
import './MoviesCard.css';
import { ReactComponent as RemoveFromSavedIcon } from '../../images/delete-movie.svg';
import { ReactComponent as SavedMovieIcon } from '../../images/saved-movie-icon.svg';

function MoviesCard(props) {

    const movieButtonClassName = (
        `movies-card__icon ${props.movie.isAlreadyAdded ? 'movies-card__icon_saved' : ''}`
    )


    function handleToggleButton() {
        props.onToggleMovie(props.movie)
    }

    return (
        <article className="movies-card" key={props.movie._id}>
            <div className="movies-card__description">
                <h4 className="movies-card__movie-title">{props.movie.nameRU}</h4>
                <span className="movies-card__movie-duration">{props.movie.duration} минут</span>
            </div>
            <a className="movies-card__trailer" target="_blank" rel="noreferrer" href={props.movie.trailerLink ? props.movie.trailerLink : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
                <img className="movies-card__movie-img" src={props.savedMovies ? props.movie.image : `${'https://api.nomoreparties.co'}${props.movie.image ? props.movie.image.url : ''}`} alt={props.movie.nameRU} />
            </a>
            {
                props.savedMovies
                    ? <button type="button" className="movies-card__icon movies-card__icon_delete" onClick={handleToggleButton}><RemoveFromSavedIcon /></button>
                    : <button type="button" className={movieButtonClassName} onClick={handleToggleButton}>

                        {props.movie.isAlreadyAdded ? (
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