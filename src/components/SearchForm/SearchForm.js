import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox";

export default function SearchForm() {
  const [movie, setMovie] = useState("");

  const handleMovieChange = (evt) => {
    setMovie(evt.target.value);
  };

  return (
    <section className="search">
      <form className="search__form">
        <div className="search__logo" />
        <input
          className="search__input"
          id="movie"
          type="search"
          name="movie"
          placeholder="Фильм"
          value={movie}
          onChange={handleMovieChange}
          required
        />
        <button className="search__button" type="submit" aria-label="Искать" />
      </form>
      <FilterCheckbox />
    </section>
  );
}
