import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";
import Navigation from "../Navigation";
import NavAuth from "../NavAuth";
import logo from "../../images/header-logo.svg";

export default function Header({ isLoggedIn }) {
  const isLoginPage = useRouteMatch({ path: "/signin" });
  const isRegisterPage = useRouteMatch({ path: "/signup" });
  const isAuth = isLoginPage || isRegisterPage;

  const headerLogoClassName = `header__logo ${
    isAuth && "header__logo_type_auth"
  }`;

  return (
    <header className="header">
      <Link exact path="/" className="header__redirect-button">
        <img
          className={headerLogoClassName}
          src={logo}
          alt="Логотип проекта Movies-Explorer"
        />
      </Link>
      <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Navigation /> : <NavAuth />}
          </Route>
          <Route path="/movies">
            <Navigation />
          </Route>
          <Route path="/saved-movies">
            <Navigation />
          </Route>
          <Route path="/profile">
            <Navigation />
          </Route>
        </Switch>
    </header>
  );
}
