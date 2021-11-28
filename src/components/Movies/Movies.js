import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'



function Movies({
    loggedIn,
    handleGetAllMovies,
    loading,
    handleToggleMovie,
    movieSearchError,
    //
    handleSearchData,
    checkBoxChecked,
    handleCheckBoxChange,
    filteredMovies
}) {

    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <SearchForm
                handleGetAllMovies={handleGetAllMovies}
                handleSearchData={handleSearchData}
                checkBoxChecked={checkBoxChecked}
                handleCheckBoxChange={handleCheckBoxChange}
            />
            { loading
                ? <Preloader />
                : <MoviesCardList
                    filteredMovies={filteredMovies}
                    savedMovies={false}
                    handleToggleMovie={handleToggleMovie}
                    movieSearchError={movieSearchError}
                />
            }
            <Footer />
        </>
    )
}

export default withRouter(Movies);