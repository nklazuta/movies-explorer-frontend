import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFilter } from "../../hooks/useFilter";
import { useNumberOfCards } from "../../hooks/useNumberOfCards";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  SEARCH_VALUE_MISSING,
} from "../../utils/utils";
import "./Movies.css";

export default function Movies() {
  const currentUser = useContext(CurrentUserContext);

  const [allMovies, setAllMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(true);
  const [localFilteredMovies, setLocalFilteredMovies] = useState([]);
  const [moviesError, setMoviesError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies"))
  );

  const { filteredMovies, filterMoviesHandle } = useFilter();
  const {
    currentShownCardsNumber,
    checkWindowWidth,
    setInitialNumberOfCards,
    setNumberOfShownCards,
    handleMoreButtonClick,
  } = useNumberOfCards();

  //эффекты при загрузке страницы
  useEffect(() => {
    checkWindowWidth();
    loadSavedMovies();

    if (localStorage.getItem("filteredMovies") !== null) {
      setSearchKey(localStorage.getItem("searchKey"));
      setIsCheckedCheckbox(JSON.parse(localStorage.getItem("isChecked")));
      setLocalFilteredMovies(
        JSON.parse(localStorage.getItem("filteredMovies"))
      );
    }

    if (localStorage.getItem("savedMovies") !== null) {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    }
  }, []);

  //эффекты при изменении количества показываемых карточек или массива карточек
  useEffect(() => {
    if (localStorage.getItem("filteredMovies") !== null) {
      showCards(
        filteredMovies.length !== 0 ? filteredMovies : localFilteredMovies
      );
    }

    findSavedMovies(
      filteredMovies.length !== 0 ? filteredMovies : localFilteredMovies
    );
    hideMoreButton();
  }, [
    currentShownCardsNumber,
    filteredMovies,
    localFilteredMovies,
    savedMovies,
  ]);

  //загрузить все фильмы с сервера BeatFilm
  const loadAllMovieCards = () => {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((res) => {
        setAllMovies(res);
        filterMoviesHandle(res, searchKey, isCheckedCheckbox);
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
        setMoviesError(FAILED_TO_FETCH_ERR);
      })
      .finally(() => setIsLoading(false));
  };

  //загрузить сохраненные пользователем фильмы
  const loadSavedMovies = () => {
    return MainApi.getMovies()
      .then((res) => {
        const movies = res.data.filter(
          (movie) => movie.owner === currentUser._id
        );
        setSavedMovies(movies);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  };

  //запрос на сохранение фильма
  const saveMovie = (data) => {
    MainApi.saveMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([newMovie, ...savedMovies])
        );
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  //запрос на удаление фильма
  const deleteMovie = (movie) => {
    MainApi.deleteMovie(movie._id)
      .then((deletedMovie) => {
        const movies = savedMovies.filter(
          (m) => m.movieId !== deletedMovie.data.movieId
        );
        setSavedMovies(movies);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  //проверить, что массив с фильмами не пустой
  const checkArrayLength = (movies) => {
    return movies.length === 0
      ? setMoviesError(NOT_FOUND_ERR)
      : setMoviesError("");
  };

  //найти уже сохраненные фильмы в массиве отфильтрованных фильмов
  const findSavedMovies = (movies) => {
    if (
      savedMovies !== null &&
      savedMovies.length !== 0 &&
      savedMovies !== undefined
    ) {
      movies.map((movie) => {
        const alreadySavedMovie = savedMovies.some(
          (m) => m.movieId === movie.id
        );
        return alreadySavedMovie
          ? (movie.isSaved = true)
          : (movie.isSaved = false);
      });
    }
  };

  //создать массив карточек с условием показа карточек не больше заданного количества
  const showCards = (filteredMovies) => {
    let movies = filteredMovies.slice(0, currentShownCardsNumber);
    setNumberOfShownCards();
    checkArrayLength(filteredMovies);
    findSavedMovies(filteredMovies);
    setShownMovies(movies);
  };

  //определить видимость кнопки "Ещё"
  const hideMoreButton = () => {
    const movies =
      filteredMovies.length !== 0 ? filteredMovies : localFilteredMovies;
    setIsButtonHidden(currentShownCardsNumber >= movies.length);
  };

  //обработчик клика кнопки лайка
  function handleSaveButtonClick(movie) {
    if (!movie.isSaved) {
      saveMovie({
        country: movie.country ? movie.country : "Страна не указана",
        director: movie.director ? movie.director : "Режиссёр не указан",
        duration: movie.duration,
        year: movie.year ? movie.year : "Год не указан",
        description: movie.description
          ? movie.description
          : "Описание не указано",
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink ? movie.trailerLink : "https://youtube.ru",
        thumbnail: movie.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
          : "Параметр не указан",
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
          ? movie.nameEN
          : "Название на английском не указано",
      });
    } else {
      const movieToDelete = savedMovies.find((m) => m.movieId === movie.id);
      deleteMovie(movieToDelete);
    }
  }

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

  //обработчик сабмита формы поиска
  function handleSubmitSearch(evt) {
    evt.preventDefault();
    setInitialNumberOfCards();

    if (allMovies === null) {
      loadAllMovieCards();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);

      filterMoviesHandle(allMovies, searchKey, isCheckedCheckbox);
    }
  }

  //обработчик чекбокса
  function handleFilterCheckboxClick() {
    setIsCheckedCheckbox(!isCheckedCheckbox);

    if (allMovies === null) {
      loadAllMovieCards();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);

      filterMoviesHandle(allMovies, searchKey, !isCheckedCheckbox);
    }
  }

  //отслеживать изменение ширины экрана
  window.addEventListener("resize", () => {
    setTimeout(() => {
      checkWindowWidth();
    }, 250);
  });

  return (
    <>
      <Header />
      <main className="movies">
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
            onClick={handleSaveButtonClick}
            {...{ moviesError }}
          />
        )}
        <button
          className={`movies__more-button
          ${isButtonHidden && "movies__more-button_hidden"}
          ${isLoading && "movies__more-button_hidden"}`}
          type="button"
          onClick={handleMoreButtonClick}
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}
