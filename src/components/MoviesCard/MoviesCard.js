import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({ movie }) {
  const isSavedMovies = useRouteMatch({ path: "/saved-movies" });
  const [isLiked, setIsLiked] = useState(false);

  const cardSaveButtonClassName = `movie__save-button ${
    isLiked && "movie__save-button_active"
  }`;

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const duratioinInHours = (duration) => {
    if (duration <= 60) {
      return `${duration}м`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = Math.floor(duration % 60);
      return `${hours}ч ${minutes}м`;
    }
  };

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
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={`Постер фильма '${movie.nameRU}'`}
        />
      </a>
      {!isSavedMovies ? (
        <button
          className={cardSaveButtonClassName}
          type="button"
          aria-label="Добавить в любимые фильмы"
          onClick={handleLikeClick}
        />
      ) : (
        <button
          className="movie__delete-button"
          type="button"
          aria-label="Удалить из любимых фильмов"
        />
      )}
      <p className="movie__duration">{duratioinInHours(movie.duration)}</p>
    </li>
  );
}
