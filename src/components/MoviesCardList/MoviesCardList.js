import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

export default function MoviesCardList({ movies }) {
  const [isEmpty, setIsEmpty] = useState(false);

  const moviesNotFoundHandle = (movies) => {
    const empty = movies.length < 1;
    setIsEmpty(empty);
  };

  useEffect(() => {
    moviesNotFoundHandle(movies);
  }, [movies]);

  return (
    <section className="cards">
      {isEmpty ? (
        <p className="cards__not-found">Фильмы не найдены</p>
      ) : (
        <ul className="cards__list">
          {movies.map((movie) => (
            <MoviesCard key={movie.movieId} {...{ movie }} />
          ))}
        </ul>
      )}
    </section>
  );
}
