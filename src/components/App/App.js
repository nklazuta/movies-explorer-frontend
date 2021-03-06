import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SUCCESS_MESSAGE } from "../../utils/utils";
import * as MainApi from "../../utils/MainApi";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getContent();
    }
  }, [isLoggedIn]);

  const getContent = () => {
    MainApi.getUser()
      .then((res) => {
        setIsLoggedIn(true);
        history.push("/movies");
        setCurrentUser(res);
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onRegister = (data) => {
    setIsSending(true);
    return MainApi.register(data)
      .then(() => onLogin(data))
      .catch((err) => setApiError(err.message === "Failed to fetch" ? err.message : err))
      .finally(() => setIsSending(false));
  };

  const onLogin = (data) => {
    setIsSending(true);
    return MainApi.login(data)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => setApiError(err.message === "Failed to fetch" ? err.message : err))
      .finally(() => setIsSending(false));
  };

  const onLogout = () => {
    return MainApi.logout()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("searchKey");
        localStorage.removeItem("isChecked");
        localStorage.removeItem("filteredMovies");
        localStorage.removeItem("savedMovies");
        history.push("/");
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const onUpdateUser = (data) => {
    setIsSending(true);
    MainApi.updateUser(data)
      .then((res) => {
        setCurrentUser(res);
        setSuccessMessage(SUCCESS_MESSAGE);
      })
      .catch((err) => setApiError(err.message === "Failed to fetch" ? err.message : err))
      .finally(() => setIsSending(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main {...{ isLoggedIn }} />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            {...{ isLoggedIn }}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            {...{ isLoggedIn }}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            {...{ isLoggedIn, onLogout, isSending, onUpdateUser, apiError, successMessage }}
          />

          <Route path="/signin">
            {!isLoggedIn ? <Login {...{ onLogin, isSending, apiError }} /> : <Redirect to="/movies" />}
          </Route>

          <Route path="/signup">
          {!isLoggedIn ? <Register {...{ onRegister, isSending, apiError }} /> : <Redirect to="/movies" />}
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
