import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useFilter } from "../../hooks/useFilter";
import * as MainApi from "../../utils/MainApi";
import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  SEARCH_VALUE_MISSING,
} from "../../utils/utils";
import "./SavedMovies.css";

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(true);
  const [moviesError, setMoviesError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const { filteredMovies, filterMoviesHandle } = useFilter();

  //эффекты при загрузке страницы
  useEffect(() => {
    if (localStorage.getItem("savedMovies") !== null) {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    }

    loadSavedMovies();
    console.log(savedMovies);
  }, []);

  //эффекты при изменении массива карточек
  useEffect(() => {
    filteredMovies.length !== 0
      ? showCards(filteredMovies)
      : showCards(savedMovies);
  }, [filteredMovies, savedMovies]);

  //загрузить сохраненные пользователем фильмы
  const loadSavedMovies = () => {
    MainApi.getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
        setMoviesError(FAILED_TO_FETCH_ERR);
      });
  };

  //запрос на удаление фильма
  const deleteMovie = (movie) => {
    MainApi.deleteMovie(movie.movieId)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((m) => m.movieId !== movie.movieId)
        );
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  //проверить, что массив с фильмами не пустой
  const checkArrayLength = (movies) => {
    const empty = movies.length === 0;
    return empty ? setMoviesError(NOT_FOUND_ERR) : setMoviesError("");
  };

  //создать массив карточек для отрисовки
  const showCards = (movies) => {
    checkArrayLength(movies);
    setShownMovies(movies.data ? movies.data : movies);
  };

  //обработчик строки поиска
  function handleSearchChange(evt) {
    const input = evt.target;

    if (input.validity.valueMissing) {
      input.setCustomValidity(SEARCH_VALUE_MISSING);
    } else {
      input.setCustomValidity("");
    }

    setSearchKey(evt.target.value);
  }

  //обработчик чекбокса
  function handleFilterCheckboxClick() {
    setIsCheckedCheckbox(!isCheckedCheckbox);
  }

  //обработчик сабмита формы поиска
  function handleSubmitSearch(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
    filterMoviesHandle(savedMovies, searchKey, isCheckedCheckbox);
  }

  //обработчик клика кнопки удаления фильма
  function handleSaveButtonClick(movie) {
    deleteMovie(movie);
  }

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm
          onSubmit={handleSubmitSearch}
          onSearchChange={handleSearchChange}
          onCheckBoxClick={handleFilterCheckboxClick}
          isChecked={isCheckedCheckbox}
          {...{ searchKey }}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={shownMovies}
            onSaveClick={handleSaveButtonClick}
            onDeleteClick={handleSaveButtonClick}
            {...{ moviesError, savedMovies }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
