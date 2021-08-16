import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, moviesError, onClick }) {
  return (
    <section className="cards">
      {moviesError !== "" ? (
        <p className="cards__not-found">{moviesError}</p>
      ) : (
        <ul className="cards__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id ? movie.id : movie.movieId}
              {...{ movie, onClick }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
