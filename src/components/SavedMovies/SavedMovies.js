import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom'



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
        return movies.filter((movie) => checked ? movie.duration <= 40 : movie.duration >= 40)
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
                onSearchSubmit={handleSearchData}
                onCheckBoxChecked={checkBoxChecked}
                onCheckBoxChange={handleCheckBoxChange}
            />
            { props.loading
                ? <Preloader />
                : <MoviesCardList
                    movies={filteredMovies}
                    savedMovies={true}
                    onToggleMovie={props.onToggleMovie}
                />
            }
            <Footer />
        </>
    )
}

export default withRouter(SaviedMovies);