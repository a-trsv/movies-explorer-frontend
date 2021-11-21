import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import ShowMoreMoviesButton from '../ShowMoreMoviesButton/ShowMoreMoviesButton';

import './Movies.css';

import { MOVIES } from '../../utils/constants'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'



function Movies({
    loggedIn
}) {
    let location = useLocation();

    return (
        <>
            <Header loggedIn={loggedIn} />
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList
                cardData={MOVIES}
                pageLocation={location.pathname}
            />
            <ShowMoreMoviesButton />
            <Footer />
        </>
    )
}

export default withRouter(Movies);