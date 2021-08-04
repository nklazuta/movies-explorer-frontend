import React from "react";
import MoviesCard from "../MoviesCard";

export default function MoviesCardList({ movies }) {
  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.movieId} {...{ movie }} />
        ))}
      </ul>
    </section>
  );
}
