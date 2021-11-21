import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import SaviedMovies from '../SavedMovies/SavedMovies';
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
  const [profileEditErrorStatus, setProfileEditErrorStatus] = React.useState(null)
  const [regErrorStatus, setRegErrorStatus] = React.useState(null)
  const [loginErrorStatus, setLoginErrorStatus] = React.useState(null)
  const [tokenErrorStatus, setTokenErrorStatus] = React.useState(null)


  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          setLoggedIn(true)
          setCurrentUser({ name: res.name, email: res.email, _id: res._id })
          
          history.push('/movies')
        })
        .catch((err) => {
          console.log(err)
          setTokenErrorStatus(err)
        })

    }
  }, [history])

  function handleLogin({ email, password }) {
    return mainApi.authorization(email, password)
      .then((res) => {
        if (res.token) {
          console.log(res.token)
          localStorage.setItem('jwt', res.token)
          mainApi.checkToken(res.token)
          setLoggedIn(true)
        }
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err)
        setLoginErrorStatus(err)
      })
  }

  function handleRegister(data) {
    const { name, email, password } = data;
    return mainApi.register(name, email, password)
      .then((res) => {
        // console.log('yspex!')
        handleLogin({ email, password })
        setCurrentUser(res)
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err)
        setRegErrorStatus(err)
      })
  }

  function handleSignOut() {
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    localStorage.removeItem('moviesContent')
    history.push('/')
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
          // onLoadMoviesList={handleGetMoviesContent}
          // cards={moviesContent}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            redirectAddress='/'
            component={SaviedMovies}
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
