import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__text-box">
      <h3 className="not-found__title">
        404
      </h3>
      <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link to="/" className="not-found__button-to-main">
        Назад
      </Link>
    </div>
  );
}
