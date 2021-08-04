import React from "react";
import { Link } from "react-router-dom";

export default function NavAuth() {
  return (
    <nav className="nav-auth">
      <Link path="/signup" className="nav-auth__register">
        Регистрация
      </Link>
      <Link path="/signin" className="nav-auth__login">
        Войти
      </Link>
    </nav>
  );
}
