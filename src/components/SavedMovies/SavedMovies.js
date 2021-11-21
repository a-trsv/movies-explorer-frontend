import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreMoviesButton from '../ShowMoreMoviesButton/ShowMoreMoviesButton';

import './SavedMovies.css';

import { MOVIES } from '../../utils/constants'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'



function SaviedMovies({
    loggedIn
}) {
    let location = useLocation();

    const savedMoviesArray = MOVIES.filter(function(e) {
        return e.isSaved === true
    })

    return (
        <>
            <Header loggedIn={loggedIn} />
            <SearchForm />
            <MoviesCardList
                cardData={savedMoviesArray}
                pageLocation={location.pathname}
            />
            <ShowMoreMoviesButton />
            <Footer />
        </>
    )
}

export default withRouter(SaviedMovies);