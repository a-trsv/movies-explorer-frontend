import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import ShowMoreMoviesButton from '../ShowMoreMoviesButton/ShowMoreMoviesButton';

import './Movies.css';

import { MOVIES } from '../../utils/constants'



function Movies() {
    let location = useLocation();

    return (
        <>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList
                cardData={MOVIES}
                pageLocation={location.pathname}
            />
            <ShowMoreMoviesButton />
        </>
    )
}

export default Movies;