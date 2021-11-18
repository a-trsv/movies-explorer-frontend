import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
    pageLocation,
    cardData
}) {

    const cardList = cardData.map((movie) => (
        <li
            key={movie.id}
        >
            <MoviesCard
                cardData={movie}
                pageLocation={pageLocation}
            />
        </li>
    ));


    return (
        <ul className="movies-card-list">
            {cardList}
        </ul>
    )
}

export default MoviesCardList;