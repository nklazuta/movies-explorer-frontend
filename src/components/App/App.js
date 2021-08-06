import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <Header {...isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}
