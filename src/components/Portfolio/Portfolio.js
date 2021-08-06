import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nklazuta.github.io/how-to-learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nklazuta.github.io/russian-travel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nklazuta.github.io/mesto/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
