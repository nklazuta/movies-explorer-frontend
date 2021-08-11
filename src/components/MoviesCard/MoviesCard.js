import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./MoviesCard.css";
import booksellers from "../../images/the-booksellers.jpg";

export default function MoviesCard({ movie }) {
  const isSavedMovies = useRouteMatch({ path: "/saved-movies" });
  const [isLiked, setIsLiked] = useState(false);

  const cardSaveButtonClassName = `movie__save-button ${
    isLiked && "movie__save-button_active"
  }`;

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className="movie">
      <h2 className="movie__title">{movie.nameRU}</h2>
      <img
        className="movie__poster"
        src={booksellers}
        alt={`Постер фильма '${movie.nameRU}'`}
      />
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
      <p className="movie__duration">{movie.duration}</p>
    </li>
  );
}
