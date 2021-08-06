import React from "react";
import MoviesCard from "../MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies }) {
  return (
    <section className="movies">
      {!movies ? (
        <p className="movies__not-found">Фильмы не найдены</p>
      ) : (
        <ul className="movies__list">
          {movies.map((movie) => (
            <MoviesCard key={movie.movieId} {...{ movie }} />
          ))}
        </ul>
      )}
    </section>
  );
}
