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
import { NOT_FOUND_ERR, FAILED_TO_FETCH_ERR } from "../../utils/utils";
import "./Movies.css";

export default function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(true);
  const [filteredMoviesFromStorage, setFilteredMoviesFromStorage] = useState(
    []
  );
  const [moviesError, setMoviesError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const currentUser = useContext(CurrentUserContext);
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
    if (localStorage.getItem("filteredMovies") !== null) {
      setSearchKey(localStorage.getItem("searchKey"));
      setIsCheckedCheckbox(JSON.parse(localStorage.getItem("isChecked")));
      setFilteredMoviesFromStorage(
        JSON.parse(localStorage.getItem("filteredMovies"))
      );
    }

    if (localStorage.getItem("savedMovies") !== null) {
      setSavedMovies(
        JSON.parse(localStorage.getItem("savedMovies"))
      );
    }

    checkWindowWidth();
    loadSavedMovies();
    loadAllMovieCards();

  }, []);

  //эффекты при изменении количества показываемых карточек или массива карточек
  useEffect(() => {
    filteredMovies.length !== 0
      ? showCards(filteredMovies)
      : showCards(filteredMoviesFromStorage);
    hideMoreButton();
  }, [currentShownCardsNumber, filteredMovies, filteredMoviesFromStorage]);

  //загрузить все фильмы с сервера Beat Movies
  const loadAllMovieCards = () => {
    MoviesApi.getMovies()
      .then((res) => setAllMovies(res))
      .catch((err) => {
        console.log("Ошибка: ", err);
        setMoviesError(FAILED_TO_FETCH_ERR);
      })
  };

  //загрузить сохраненные пользователем фильмы
  const loadSavedMovies = () => {
    MainApi.getMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(res)
        );
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  };

  //запрос на сохранение фильма
  const saveMovie = (data) => {
    MainApi.saveMovie(data)
      .then((newMovie) => {
        setSavedMovies((state) => [newMovie, ...state]);
        newMovie.isSaved = true;
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  //запрос на удаление фильма
  const deleteMovie = (movie) => {
    MainApi.deleteMovie(movie.movieId)
      .then((newMovie) => {
        setSavedMovies((state) =>
        state.map((m) => m.id === movie.id ? newMovie : m)
        );
        newMovie.isSaved = false;
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  //проверить, что массив с фильмами не пустой
  const checkArrayLength = (movies) => {
    const empty = movies.length === 0;
    return empty ? setMoviesError(NOT_FOUND_ERR) : setMoviesError("");
  };

  //найти уже сохраненные фильмы в массиве отфильтрованных фильмов
  const findSavedMovies = (movies) => {
    console.log(movies)
    console.log(savedMovies)
    movies.map((movie) => {
      const alreadySavedMovie = savedMovies.data.some((m) => m.movieId === movie.id);
      console.log(alreadySavedMovie);
      return alreadySavedMovie ? movie.isSaved = true : movie.isSaved = false;
    });
  };

  //создать массив карточек с условием показа карточек не больше заданного количества
  const showCards = (filteredMovies) => {
    setNumberOfShownCards();
    checkArrayLength(filteredMovies);
    findSavedMovies(filteredMovies);
    let movies = filteredMovies.slice(0, currentShownCardsNumber);
    return setShownMovies(movies);
  };

  //определить видимость кнопки "Ещё"
  const hideMoreButton = () => {
    const movies = filteredMovies.length !== 0
      ? filteredMovies
      : filteredMoviesFromStorage;
    const isShownArrayLonger = currentShownCardsNumber >= movies.length;
    setIsButtonHidden(isShownArrayLonger);
  };

  //обработчик строки поиска
  function handleSearchChange(evt) {
    setSearchKey(evt.target.value);
  }

  //обработчик чекбокса
  function handleFilterCheckboxClick() {
    setIsCheckedCheckbox(!isCheckedCheckbox);
  }

  //обработчик клика кнопки лайка
  function handleSaveButtonClick(movie) {
    console.log(movie.isSaved);
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
      deleteMovie(movie);
    }
  }

  //обработчик сабмита формы поиска
  function handleSubmitSearch(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
    filterMoviesHandle(allMovies, searchKey, isCheckedCheckbox);
    setInitialNumberOfCards();
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
            onSaveClick={handleSaveButtonClick}
            onDeleteClick={handleSaveButtonClick}
            {...{ moviesError, savedMovies }}
          />
        )}
        <button
          className={`movies__more-button ${
            isButtonHidden && "movies__more-button_hidden"
          }`}
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
