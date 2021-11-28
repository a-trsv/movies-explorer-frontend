import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundError from '../NotFoundError/NotFoundError';
import Profile from '../Profile/Profile';
import AuthHeader from '../AuthHeader/AuthHeader';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { CurrentUserContext } from '../../components/CurrentUserContext/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
// добавляем константы успешных ответов от сервера для передачи пользователю
import { PROFILE } from '../../utils/success-message'
// добавляем константы неуспешных ответов от сервера для передачи пользователю
import { LOGIN_PAGE_ERRORS, PROFILE_PAGE_ERRORS, REGISTER_PAGE_ERRORS, ANOTHER_ERRORS } from '../../utils/errors';
import { MOVIE_DURATION } from '../../utils/constants'
// console.log(MOVIE_DURATION.SHORT_FILM_TIMELINE)


function App() {

  const history = useHistory()
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);

  const [movies, setMovies] = React.useState([])
  const [userMovies, setUserMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [movieSearchError, setMovieSearchError] = React.useState('')

  // error&success state for profile, login & register
  const [profileStatus, setProfileStatus] = React.useState(null)

  const location = useLocation()

  function handleLogin({ email, password }) {
    return mainApi.authorization(email, password)
      .then((res) => {
        if (res.token) {
          // console.log(res.token)
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          tokenCheck()
          history.push('/movies')
        }
      })
      .catch((err) => {
        console.log(err)
        if (err === '400') {
          console.log('400')
          showProfileStatus(LOGIN_PAGE_ERRORS.WRONG_USER_INFO)
        }
        if (err === '401') {
          console.log('401')
          showProfileStatus(LOGIN_PAGE_ERRORS.WRONG_TOKEN_REQUEST)
        }
        if (err === '500') {
          console.log('500')
          showProfileStatus(ANOTHER_ERRORS.SERVER_ERROR)
        }
      })
  }


  const tokenCheck = () => {
    const token = localStorage.getItem('jwt')
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email, _id: res._id })
            setLoggedIn(true)
            // console.log('zashel + tokencheck')
            history.push(location)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err === '409') {
            console.log('409')
            showProfileStatus(LOGIN_PAGE_ERRORS.WRONG_TOKEN_COMPARE)
          }
        })
    }
  }

  function handleSignOut() {
    setLoggedIn(false)
    localStorage.clear()
    setMovies([])
    setUserMovies([])
    history.push('/')
  }

  function handleRegister(data) {
    const { name, email, password } = data;
    return mainApi.register(name, email, password)
      .then((res) => {
        // console.log('yspex!')
        handleLogin({ email, password })
      })
      .catch((err) => {
        console.log(err)
        if (err === '400') {
          console.log('400')
          showProfileStatus(REGISTER_PAGE_ERRORS.USER_REGISTER_ERROR)
        }
        if (err === '409') {
          console.log('409')
          showProfileStatus(REGISTER_PAGE_ERRORS.USER_EXIST_ERROR)
        }
        if (err === '500') {
          console.log('500')
          showProfileStatus(ANOTHER_ERRORS.SERVER_ERROR)
        }
      })
  }


  function handleUpdateProfile(data) {
    const token = localStorage.getItem('jwt')
    mainApi.updateProfile(data, token)
      .then((res) => {
        setCurrentUser(res)
        // Передаем успешный ответ пользователю
        showProfileStatus(PROFILE.SUCCESS_STATUS)
      })
      .catch((err) => {
        // console.log(err)
        if (err === '400') {
          console.log('400')
          showProfileStatus(PROFILE_PAGE_ERRORS.PROFILE_EDIT_ERROR)
        }
        if (err === '409') {
          console.log('409')
          showProfileStatus(PROFILE_PAGE_ERRORS.PROFILE_EXIST_ERROR)

        }
        if (err === '500') {
          console.log('500')
          showProfileStatus(ANOTHER_ERRORS.SERVER_ERROR)
        }
      })
  }

  // Загружаем сообщение, если получен успешный ответ от сервера, затем скрываем ответ через setTimeout
  function showProfileStatus(status) {
    setProfileStatus(status)
    // console.log(status)
    setTimeout(() => setProfileStatus(null), 3500)
  }

  // movies

  function handleGetAllMovies() {
    setLoading(true)
    setMovieSearchError('')
    const localMovies = JSON.parse(localStorage.getItem('movies'))
    if (localMovies) {
      setTimeout(() => setLoading(false), 500)
      setMovies(matchedMovies(localMovies, userMovies))
    } else {
      moviesApi.getMoviesContent()
        .then((res) => {
          // console.log(res)
          localStorage.setItem('movies', JSON.stringify(res))
          setTimeout(() => setLoading(false), 500)
          setMovies(matchedMovies(res, userMovies))
          setMovieSearchError('Ничего не найдено')
        })
        .catch((err) => {
          setMovieSearchError('Ошибочка')
          setTimeout(() => setLoading(false), 500)
          console.log(err)
        })
    }
  }

  function handleAddFilm(movie) {
    setLoading(true)
    mainApi.addFilm(movie)
      .then((newUserMovie) => {
        // console.log(newUserMovie)
        setTimeout(() => setLoading(false), 500)
        setUserMovies([newUserMovie, ...userMovies])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDelFilm(movie) {
    const userMovie = userMovies.find((userMovie) =>
      userMovie.movieId === (movie.id || movie.movieId || movie._id)
    )
    const isOwn = userMovie.owner._id === currentUser._id
    setLoading(true)
    mainApi.deleteFilm(userMovie._id, isOwn)
      .then(() => {
        const newUserMovies = userMovies.filter((userMovie) =>
          userMovie.movieId !== (movie.id || movie.movieId || movie._id)
        )
        setTimeout(() => setLoading(false), 500)
        setUserMovies(newUserMovies)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleToggleMovie(movie) {
    if (!movie.isAlreadyAdded && !movie._id) {
      handleAddFilm(movie)
    } else {
      handleDelFilm(movie)
    }
  }

  function matchedMovies(movies, userMovies) {
    userMovies.forEach((userMovie) => {
      movies[movies.findIndex((movie) => movie.id === userMovie.movieId)].isAlreadyAdded = true;
    });
    return movies;
  }

  // useEffects

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      setLoading(true)
      Promise.all([mainApi.getUserData(), mainApi.getUserMovies()])
        .then(([userData, userMovies]) => {
          setCurrentUser(userData.data)
          // console.log(userData)
          // console.log(userData.data)
          setTimeout(() => setLoading(false), 500)
          setUserMovies(userMovies)
        })
        .catch(() => {
          setTimeout(() => setLoading(false), 500)
          setMovieSearchError('Ничего не найдено')
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    setLoading(true)
    const localMovies = JSON.parse(localStorage.getItem('movies'))
    // console.log(localMovies)
    if (localMovies) {
      setTimeout(() => setLoading(false), 500)
      setMovies(matchedMovies(localMovies, userMovies))
      setMovieSearchError('Ничего не найдено')
    } else {
      setTimeout(() => setLoading(false), 500)
      setMovies([])
      setMovieSearchError('Начните поиск')
    }
  }, [userMovies])




  //movies.js

  const [searchData, setSearchData] = React.useState('')
  const [checkBoxChecked, setCheckBoxChecked] = React.useState(false)
  const [filteredMovies, setFilteredMovies] = React.useState([])
  const getLocalMovies = JSON.parse(localStorage.getItem('movies'))

  const filteredFoundMovies = searchMovieFilter(movies, searchData)
  const filteredFoundMoviesWithDuration = movieDurationFilter(filteredFoundMovies, checkBoxChecked)

  function searchMovieFilter(movies, keyword) {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
  }

  function movieDurationFilter(movies, checked) {
    return movies.filter((movie) => (checked ? movie.duration <= MOVIE_DURATION.SHORT_FILM_TIMELINE : movie.duration >= MOVIE_DURATION.SHORT_FILM_TIMELINE))
  }

  function handleSearchData(keyword) {
    // console.log(keyword)

    setSearchData(keyword)
    if (!getLocalMovies) {
      handleGetAllMovies()
    }
  }

  function handleCheckBoxChange() {
    setCheckBoxChecked(!checkBoxChecked)
  }

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
    setFilteredMovies(filteredFoundMoviesWithDuration)
  }, [movies, searchData, checkBoxChecked])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>

          <Route exact path='/'>
            <Header
              loggedIn={loggedIn}
            />
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            redirectAddress='/'
            component={Movies}
            onGetMovies={handleGetAllMovies}
            filteredMovies={filteredMovies}
            handleSearchData={handleSearchData}
            checkBoxChecked={checkBoxChecked}
            handleCheckBoxChange={handleCheckBoxChange}
            loading={loading}
            handleToggleMovie={handleToggleMovie}
            movieSearchError={movieSearchError}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            redirectAddress='/'
            component={SavedMovies}
            userMovies={userMovies}
            loading={loading}
            onToggleMovie={handleToggleMovie}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateProfile={handleUpdateProfile}
            redirectAddress='/'
            component={Profile}
            profileStatus={profileStatus}
          />

          <Route exact path='/signup'>
            <AuthHeader />
            <Register
              loggedIn={loggedIn}
              onRegister={handleRegister}
              profileStatus={profileStatus}
            />
          </Route>

          <Route exact path='/signin'>
            <AuthHeader />
            <Login
              loggedIn={loggedIn}
              onLogin={handleLogin}
              profileStatus={profileStatus}
            />
          </Route>

          <Route path="*">
            <NotFoundError
              loggedIn={loggedIn}
               />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
