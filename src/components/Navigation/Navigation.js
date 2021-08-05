import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navigationClassName = `navigation ${
    isMenuOpen && "navigation_menu-open"
  }`;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={navigationClassName}>
      <button
        className="navigation__burger"
        type="button"
        aria-label="Меню"
        onClick={toggleMenu}
      />
      <div className="navigation__wrapper">
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink exact to="/" className="navigation__link navigation__link_hidden" activeClassName="navigation__link_active">
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className="navigation__profile-button">
          Аккаунт
        </Link>
      </div>
    </nav>
  );
}
