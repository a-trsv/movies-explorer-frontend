import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreMoviesButton from '../ShowMoreMoviesButton/ShowMoreMoviesButton';

import './SavedMovies.css';

import { MOVIES } from '../../utils/constants'



function SaviedMovies() {
    let location = useLocation();

    const savedMoviesArray = MOVIES.filter(function(e) {
        return e.isSaved === true
    })

    return (
        <>
            <SearchForm />
            <MoviesCardList
                cardData={savedMoviesArray}
                pageLocation={location.pathname}
            />
            <ShowMoreMoviesButton />
        </>
    )
}

export default SaviedMovies;