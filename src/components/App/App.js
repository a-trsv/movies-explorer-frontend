import React from 'react';
import { Route, Switch } from 'react-router-dom';
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


function App() {

  // const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="app">
      <Switch>

        <Route exact path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>

        <Route exact path='/movies'>
          <Header />

          <Movies />
          <Footer />
        </Route>

        <Route exact path='/saved-movies'>
          <Header />
          <SaviedMovies />
          <Footer />
        </Route>

        <Route exact path='/profile'>
          <Header />

          <Profile />
        </Route>

        <Route exact path='/profile'>
          <Header />
          <Profile />
        </Route>

        <Route exact path='/signup'>
          <AuthHeader />
          <Register />
        </Route>

        <Route exact path='/signin'>
          <AuthHeader />
          <Login />
        </Route>

        <Route path="*">
          <NotFoundError />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
