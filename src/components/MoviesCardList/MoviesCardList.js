import React from 'react';
// import useWindowSize from '../../utils/useWindowSize';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList(props) {


    // 1280px -> 12 cards x 3 row (3+3+3+3), showMoreMovies + 3
    // 768px -> 8 cards x 2 row (2+2+2+2), showMoreMovies + 2
    // 320px - 480px -> 5 cards x 1 row (1+1+1+1+1), showMoreMovies +1

    const [defaultCards, setDefaultCards] = React.useState(0)
    const [addCards, setAddCards] = React.useState(3)

    function showMoreMovies() {
        setDefaultCards(defaultCards + addCards)
    }

    React.useEffect(() => {
        setDefaultCards(0)
    }, [])

    React.useEffect(() => {
        setDefaultCards(
            window.innerWidth >= 1280
            ? 12
            : window.innerWidth < 1280 && window.innerWidth >= 768
            ? 8
            : window.innerWidth < 768 && window.innerWidth >= 320
            ? 5
            : null
        )
    }, [])

    React.useEffect(() => {
        function handleResize() {
            setDefaultCards(window.innerWidth >= 1280 ? 12 : window.innerWidth < 1280 && window.innerWidth >= 768 ? 8 : window.innerWidth < 768 && window.innerWidth >= 320 ? 5 : null )
            setAddCards(window.innerWidth >= 1280 ? 3 : window.innerWidth < 1280 && window.innerWidth >= 768 ? 2 : window.innerWidth < 768 && window.innerWidth >= 320 ? 2 : null )
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []) 

   


    return (
        <>
            <ul className="movies-card-list">
                {props.movies.length > 0 && props.movies.slice(0, defaultCards).map((movie, i) => (
                    <MoviesCard
                        movie={movie}
                        key={i}
                        savedMovies={props.savedMovies}
                        onToggleMovie={props.onToggleMovie}
                    />
                ))}
            </ul>

            { props.savedMovies ? props.movies.length < 1 && <p className="movies-card-list__error-span">Нет добавленных фильмов</p> : props.movies.length < 1 && <p className="movies-card-list__error-span">{props.movieSearchError}</p>}
            <div className="movies-card-list__show-more">
                {
                    props.savedMovies
                        ? ''
                        : (props.movies.length > 0) && (props.movies.length > defaultCards) ? <button onClick={showMoreMovies} className="movies-card-list__show-button">Ещё</button> : ''
                }
            </div>
        </>
    )
}

export default MoviesCardList;