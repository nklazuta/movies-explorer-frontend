import { useState } from "react";
import { useRouteMatch } from "react-router-dom";

export default function MoviesCard({ movie }) {
  const isSavedMovies = useRouteMatch({ path: "/saved-movies" });
  const [isLiked, setIsLiked] = useState(false);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__title">{movie.nameRU}</h2>
      <img
        className="card__poster"
        src={movie.image}
        alt={`Постер фильма '${movie.nameRU}'`}
      />
      {!isSavedMovies ? (
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Добавить в любимые фильмы"
          onClick={handleLikeClick}
        />
      ) : (
        <button
          className="card__delete-button"
          type="button"
          aria-label="Удалить из любимых фильмов"
        />
      )}
      <p className="card__duration">{movie.duration}</p>
    </li>
  );
}
