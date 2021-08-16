import React from "react";
import { useRouteMatch } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({ movie, onClick }) {
  const isSavedMovies = useRouteMatch({ path: "/saved-movies" });

  const cardSaveButtonClassName = `movie__save-button ${
    movie.isSaved && "movie__save-button_active"
  }`;

  const ariaLabelSaveButton = `${
    !movie.isSaved ? "Добавить в любимые фильмы" : "Удалить из любимых фильмов"
  }`;

  const duratioinInHours = (duration) => {
    if (duration <= 60) {
      return `${duration}м`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = Math.floor(duration % 60);
      return `${hours}ч ${minutes}м`;
    }
  };

  function handleClick(movie) {
    onClick(movie);
  }

  return (
    <li className="movie">
      <h2 className="movie__title">{movie.nameRU}</h2>
      <a
        className="movie__trailer"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movie__poster"
          src={
            movie.image.url
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={`Постер фильма '${movie.nameRU}'`}
        />
      </a>
      {!isSavedMovies ? (
        <button
          className={cardSaveButtonClassName}
          type="button"
          aria-label={ariaLabelSaveButton}
          onClick={() => handleClick(movie)}
        />
      ) : (
        <button
          className="movie__delete-button"
          type="button"
          aria-label="Удалить из любимых фильмов"
          onClick={() => handleClick(movie)}
        />
      )}
      <p className="movie__duration">{duratioinInHours(movie.duration)}</p>
    </li>
  );
}
