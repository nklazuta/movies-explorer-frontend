import { useState } from "react";

export function useFilter() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  function filterMoviesHandle(movies, keyword, isChecked) {
    localStorage.setItem("searchKey", keyword);
    localStorage.setItem("isChecked", isChecked);

    let filteredMoviesByKeyword = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        (movie.nameEN ? movie.nameEN : "")
          .toLowerCase()
          .includes(keyword.toLowerCase())
    );

    if (!isChecked) {
      let filteredMoviesByCheckbox = filteredMoviesByKeyword.filter(
        (movie) => movie.duration > 40
      );

      //findSavedMovies(filteredMoviesByCheckbox);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByCheckbox)
      );
      return setFilteredMovies(filteredMoviesByCheckbox);
    } else {
      //findSavedMovies(filteredMoviesByKeyword);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByKeyword)
      );
      return setFilteredMovies(filteredMoviesByKeyword);
    }
  }

  return { filteredMovies, filterMoviesHandle };
}
