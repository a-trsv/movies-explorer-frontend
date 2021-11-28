import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'
import { MOVIE_DURATION } from '../../utils/constants'




function SaviedMovies(props) {
    const [searchData, setSearchData] = React.useState('')
    const [checkBoxChecked, setCheckBoxChecked] = React.useState(false)
    const [filteredMovies, setFilteredMovies] = React.useState([])
    const filteredFoundMovies = searchMovieFilter(props.userMovies, searchData)
    const filteredFoundMoviesWithDuration = movieDurationFilter(filteredFoundMovies, checkBoxChecked)

    function searchMovieFilter(movies, keyword) {
        return movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
    }

    function movieDurationFilter(movies, checked) {
        return movies.filter((movie) => checked ? movie.duration <= MOVIE_DURATION.SHORT_FILM_TIMELINE : movie.duration >= MOVIE_DURATION.SHORT_FILM_TIMELINE)
    }

    function handleSearchData(keyword) {
        setSearchData(keyword)
    }

    function handleCheckBoxChange() {
        setCheckBoxChecked(!checkBoxChecked)
    }

    React.useEffect(() => {
        setFilteredMovies(filteredFoundMoviesWithDuration)
    }, [props.userMovies, searchData, checkBoxChecked])

    return (
        <>
            <Header
                loggedIn={props.loggedIn}
            />
            <SearchForm
                handleSearchData={handleSearchData}
                checkBoxChecked={checkBoxChecked}
                handleCheckBoxChange={handleCheckBoxChange}
            />
            { props.loading
                ? <Preloader />
                :
                <MoviesCardList
                    filteredMovies={filteredMovies}
                    savedMovies={true}
                    handleToggleMovie={props.onToggleMovie}
                />
            }
            <Footer />
        </>
    )
}

export default withRouter(SaviedMovies);