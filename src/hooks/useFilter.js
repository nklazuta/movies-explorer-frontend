import { useState } from "react";

export function useFilter() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  function filterMoviesHandle(movies, keyword, isChecked) {
    localStorage.setItem("searchKey", keyword);
    localStorage.setItem("isChecked", isChecked);

    const filteredMoviesByKeyword = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        (movie.nameEN ? movie.nameEN : "")
          .toLowerCase()
          .includes(keyword.toLowerCase())
    );

    if (!isChecked) {
      const filteredMoviesByCheckbox = filteredMoviesByKeyword.filter(
        (movie) => movie.duration > 40
      );

      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByCheckbox)
      );
      return setFilteredMovies(filteredMoviesByCheckbox);
    } else {
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByKeyword)
      );
      return setFilteredMovies(filteredMoviesByKeyword);
    }
  }

  return { filteredMovies, filterMoviesHandle };
}
