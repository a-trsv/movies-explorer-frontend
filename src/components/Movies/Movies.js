import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'



function Movies(props) {
    const [searchData, setSearchData] = React.useState('')
    const [checkBoxChecked, setCheckBoxChecked] = React.useState(false)
    const [filteredMovies, setFilteredMovies] = React.useState([])
    const getLocalMovies = JSON.parse(localStorage.getItem('movies'))

    const filteredFoundMovies = searchMovieFilter(props.movies, searchData)


    const filteredFoundMoviesWithDuration = movieDurationFilter(filteredFoundMovies, checkBoxChecked)

    function searchMovieFilter(movies, keyword) {
        return movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
    }

    function movieDurationFilter(movies, checked) {
        return movies.filter((movie) => (checked ? movie.duration <= 40 : movie.duration >= 40))
    }

    function handleSearchData(keyword) {
        // console.log(keyword)
        setSearchData(keyword)
        if (!getLocalMovies) {
            props.onGetMovies()
        }
    }

    function handleCheckBoxChange() {
        setCheckBoxChecked(!checkBoxChecked)
    }

    React.useEffect(() => {
        setFilteredMovies(filteredFoundMoviesWithDuration)
    }, [props.movies, searchData, checkBoxChecked])


    return (
        <>
            <Header
                loggedIn={props.loggedIn}
            />
            <SearchForm
                onGetMovies={props.onGetMovies}
                onSearchSubmit={handleSearchData}
                onCheckBoxChecked={checkBoxChecked}
                onCheckBoxChange={handleCheckBoxChange}
            />
            { props.loading
                ? <Preloader />
                : <MoviesCardList
                    movies={filteredMovies}
                    savedMovies={false}
                    onToggleMovie={props.onToggleMovie}
                    movieSearchError={props.movieSearchError}
                />
            }
            <Footer />
        </>
    )
}

export default withRouter(Movies);