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


function App() {

  const history = useHistory()
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);

  const [movies, setMovies] = React.useState([])
  const [userMovies, setUserMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [movieSearchError, setMovieSearchError] = React.useState('')

  // error for profile, login & register
  const [profileEditErrorStatus, setProfileEditErrorStatus] = React.useState(null)
  const [regErrorStatus, setRegErrorStatus] = React.useState(null)
  const [loginErrorStatus, setLoginErrorStatus] = React.useState(null)
  const [tokenErrorStatus, setTokenErrorStatus] = React.useState(null)
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
        setLoginErrorStatus(err)
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
          setTokenErrorStatus(err)
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
        setRegErrorStatus(err)
      })
  }


  function handleUpdateProfile(data) {
    const token = localStorage.getItem('jwt')
    mainApi.updateProfile(data, token)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
        setProfileEditErrorStatus(err)
      })
  }

  // movies

  function handleGetAllMovies() {
    setLoading(true)
    setMovieSearchError('')
    const localMovies = JSON.parse(localStorage.getItem('movies'))
    if (localMovies) {
      setLoading(false)
      setMovies(matchedMovies(localMovies, userMovies))
    } else {
      moviesApi.getMoviesContent()
        .then((res) => {
          // console.log(res)
          setLoading(false)
          localStorage.setItem('movies', JSON.stringify(res))
          setMovies(matchedMovies(res, userMovies))
          setMovieSearchError('Ничего не найдено')
        })
        .catch((err) => {
          setMovieSearchError('Ошибочка')
          setLoading(false)
          console.log(err)
        })
    }
  }

  function handleAddFilm(movie) {
    mainApi.addFilm(movie)
      .then((newUserMovie) => {
        console.log(newUserMovie)
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
    mainApi.deleteFilm(userMovie._id, isOwn)
      .then(() => {
        const newUserMovies = userMovies.filter((userMovie) =>
          userMovie.movieId !== (movie.id || movie.movieId || movie._id)
        )
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
          setLoading(false)
          setCurrentUser(userData.data)
          // console.log(userData)
          // console.log(userData.data)
          setUserMovies(userMovies)
        })
        .catch(() => {
          setLoading(false)
          setMovieSearchError('Ничего не найдено')
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies'))
    // console.log(localMovies)
    if (localMovies) {
      setMovies(matchedMovies(localMovies, userMovies))
      setMovieSearchError('Ничего не найдено')
    } else {
      setMovies([])
      setMovieSearchError('Начните поиск')
    }
  }, [userMovies])

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
            movies={movies}
            loading={loading}
            onToggleMovie={handleToggleMovie}
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
            profileEditErrorStatus={profileEditErrorStatus}
            redirectAddress='/'
            component={Profile}
          />

          <Route exact path='/signup'>
            <AuthHeader />
            <Register
              loggedIn={loggedIn}
              onRegister={handleRegister}
              regErrorStatus={regErrorStatus}
            />
          </Route>

          <Route exact path='/signin'>
            <AuthHeader />
            <Login
              loggedIn={loggedIn}
              onLogin={handleLogin}
              loginErrorStatus={loginErrorStatus}
              tokenErrorStatus={tokenErrorStatus}
            />
          </Route>

          <Route path="*">
            <NotFoundError />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
