import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            <Link exact path="/" className="navigation__link">
              Главная
            </Link>
          </li>
          <li>
            <Link path="/movies" className="navigation__link">
              Фильмы
            </Link>
          </li>
          <li>
            <Link path="/saved-movies" className="navigation__link">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link path="/profile" className="navigation__profile-button">
          Аккаунт
        </Link>
      </div>
    </nav>
  );
}
