import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, moviesError }) {
  return (
    <section className="cards">
      {moviesError !== "" ? (
        <p className="cards__not-found">{moviesError}</p>
      ) : (
        <ul className="cards__list">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} {...{ movie }} />
          ))}
        </ul>
      )}
    </section>
  );
}
