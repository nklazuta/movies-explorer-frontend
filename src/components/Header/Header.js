import React from "react";
import { Route, Switch, useRouteMatch  } from "react-router-dom";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Navigation from "../Navigation/Navigation";
import NavAuth from "../NavAuth/NavAuth";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  const isMain = useRouteMatch({ path: "/", exact: true });

  const headerClassName = `header
  ${isMain && "header_type_main"}
  `;

  return (
    <header className={headerClassName}>
      <HeaderLogo />
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Navigation {...{isMain}} /> : <NavAuth />}
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
