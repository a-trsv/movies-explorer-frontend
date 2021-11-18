import React from 'react';
import './MoviesCard.css';
import MoviesCardIconHandler from '../MoviesCardIconHandler/MoviesCardIconHandler';

function MoviesCard({
    cardData,
    pageLocation
}) {
    const [isSaved, setIsSaved] = React.useState(cardData.isSaved);
    function saveMovieHandler() {
        setIsSaved(!isSaved);
    }

    return (
        <article className="movies-card">
            <div className="movies-card__description">
                <h4 className="movies-card__movie-title">{cardData.title}</h4>
                <span className="movies-card__movie-duration">{cardData.duration}</span>
            </div>
            <img className="movies-card__movie-img" src={cardData.imageSRC} alt={cardData.title} />
            <MoviesCardIconHandler
                onClick={saveMovieHandler}
                pageLocation={pageLocation}
                isSaved={isSaved}
            />
        </article>
    )
}
export default MoviesCard;