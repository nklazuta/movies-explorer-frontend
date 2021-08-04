import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <p className="footer__copyright">&copy; {currentYear}</p>
      <ul class="footer__links">
        <li>
          <a
            className="footer__link"
            href="https://praktikum.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://github.com/nklazuta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://www.facebook.com/nklazuta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
      </ul>
    </footer>
  );
}
