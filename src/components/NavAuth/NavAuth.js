import React from "react";
import { Link } from "react-router-dom";
import "./NavAuth.css";

export default function NavAuth() {
  return (
    <nav className="nav-auth">
      <Link to="/signup" className="nav-auth__register">
        Регистрация
      </Link>
      <Link to="/signin" className="nav-auth__login">
        Войти
      </Link>
    </nav>
  );
}
