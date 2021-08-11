import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo.svg";
import "./HeaderLogo.css";

export default function HeaderLogo() {
  return (
    <Link exact to="/" className="header-logo">
      <img
        className="header-logo__img"
        src={logo}
        alt="Логотип проекта Movies-Explorer"
      />
    </Link>
  );
}
