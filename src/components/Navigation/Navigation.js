import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ isMain }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navigation ${isMenuOpen && "navigation_menu-open"}`}>
      <button
        className={`navigation__burger ${
          isMain && "navigation__burger_type_main"
        }`}
        type="button"
        aria-label="Меню"
        onClick={toggleMenu}
      />
      <div className="navigation__wrapper">
        <button
          className="navigation__close-button"
          type="button"
          aria-label="Закрыть меню"
          onClick={toggleMenu}
        />
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink
              exact
              to="/"
              className="navigation__link navigation__link_hidden"
              activeClassName="navigation__link_active"
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/movies"
              className={`navigation__link ${
                isMain && "navigation__link_type_main"
              }`}
              activeClassName="navigation__link_active"
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/saved-movies"
              className={`navigation__link ${
                isMain && "navigation__link_type_main"
              }`}
              activeClassName="navigation__link_active"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link
          to="/profile"
          className={`navigation__profile-button ${
            isMain && "navigation__profile-button_type_main"
          }`}
        >
          Аккаунт
        </Link>
      </div>
      <div className="navigation__background"></div>
    </nav>
  );
}
