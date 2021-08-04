import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navigationClassName = `navigation ${
    isMenuOpen && "navigation_type_menu-open"
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
          <li>
            <NavLink exact to="/" className="navigation__link">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">
              Фильмы
            </NavLink>
          </li>
          <li>
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
