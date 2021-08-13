import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    MainApi.getUser()
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onRegister = (data) => {
    setIsSending(true);
    return MainApi.register(data)
      .then(() => onLogin(data))
      .catch((err) => {
        console.log("Ошибка: ", err);
      })
      .finally(() => setIsSending(false));
  };

  const onLogin = (data) => {
    setIsSending(true);
    return MainApi.login(data)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      })
      .finally(() => setIsSending(false));
  };

  const onLogout = () => {
    return MainApi.logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/signin");
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onUpdateUser = (data) => {
    setIsSending(true);
    MainApi.updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log("Ошибка: ", err))
      .finally(() => setIsSending(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main {...{ isLoggedIn }} />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile {...{ onLogout, isSending, onUpdateUser }} />
          </Route>

          <Route path="/signin">
            <Login {...{ onLogin, isSending }} />
          </Route>

          <Route path="/signup">
            <Register {...{ onRegister, isSending }} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
