import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  INITIAL_MOBILE_NUMBER_OF_CARDS,
  INITIAL_TABLET_NUMBER_OF_CARDS,
  INITIAL_COMPUTER_NUMBER_OF_CARDS,
} from "../../utils/utils";
import "./Movies.css";

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesError, setMoviesError] = useState("");
  const [currentShownCardsNumber, setCurrentShownCardsNumber] = useState(0);
  const [shownMovies, setShownMovies] = useState([]);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  const MOBILE = windowWidth >= 320 && windowWidth <= 689;
  const TABLET = windowWidth > 689 && windowWidth < 1088;
  const COMPUTER = windowWidth >= 1088;

  useEffect(() => {
    setSearchKey(localStorage.getItem("searchKey"));
    setIsCheckedCheckbox(JSON.parse(localStorage.getItem("isChecked")));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
    checkWindowWidth();
    loadSavedMovies();
  }, []);

  useEffect(() => {
    showCards(filteredMovies);
    hideMoreButton();
  }, [currentShownCardsNumber, filteredMovies]);

  const checkWindowWidth = () => {
    setWindowWidth(document.body.clientWidth);
  };

  const loadMovieCards = () => {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((res) => filterMoviesHandle(res, searchKey, isCheckedCheckbox))
      .catch((err) => {
        console.log("Ошибка: ", err);
        setMoviesError(FAILED_TO_FETCH_ERR);
      })
      .finally(() => setIsLoading(false));
  };

  const loadSavedMovies = () => {
    MainApi.getMovies()
    .then((res) => {
      setSavedMoviesList(res);
      localStorage.setItem("savedMovies", JSON.stringify(res));
    })
    .catch((err) => {
      console.log("Ошибка: ", err);
    })
  }

  const filterMoviesHandle = (movies, key, isChecked) => {
    localStorage.setItem("searchKey", key);
    localStorage.setItem("isChecked", isChecked);
    let filteredMoviesByKey = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(key.toLowerCase()) ||
        (movie.nameEN ? movie.nameEN : "")
          .toLowerCase()
          .includes(key.toLowerCase())
    );

    if (!isChecked) {
      let filteredMoviesByCheckbox = filteredMoviesByKey.filter(
        (movie) => movie.duration > 40
      );
      moviesNotFound(filteredMoviesByCheckbox);
      findSavedMovies(filteredMoviesByCheckbox);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByCheckbox)
      );
      return setFilteredMovies(filteredMoviesByCheckbox);
    } else {
      moviesNotFound(filteredMoviesByKey);
      findSavedMovies(filteredMoviesByKey);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByKey)
      );
      return setFilteredMovies(filteredMoviesByKey);
    }
  };

  const moviesNotFound = (movies) => {
    const empty = movies.length < 1;
    return empty ? setMoviesError(NOT_FOUND_ERR) : setMoviesError("");
  };

  const showCards = (filteredMovies) => {
    numberOfShownCards();
    let movies = filteredMovies.slice(0, currentShownCardsNumber);
    return setShownMovies(movies);
  };

  const initialNumberOfCards = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(INITIAL_MOBILE_NUMBER_OF_CARDS);
    } else if (TABLET) {
      setCurrentShownCardsNumber(INITIAL_TABLET_NUMBER_OF_CARDS);
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(INITIAL_COMPUTER_NUMBER_OF_CARDS);
    }
  };

  const numberOfShownCards = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_MOBILE_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    } else if (TABLET) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_TABLET_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_COMPUTER_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    }
  };

  const hideMoreButton = () => {
    const tooLongArray = currentShownCardsNumber >= filteredMovies.length;
    setIsButtonHidden(tooLongArray);
  };

  const handleMoreButtonClick = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (TABLET) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 3);
    }
  };

  const handleSearchChange = (evt) => {
    setSearchKey(evt.target.value);
  };

  const handleFilterCheckboxClick = () => {
    setIsCheckedCheckbox(!isCheckedCheckbox);
  };

  const findSavedMovies = (movies) => {
    movies.map((movie) => {
      console.log(movie.owner === currentUser.id)
      return movie.owner === currentUser.id ? movie.isSaved = true : movie.isSaved = false;
    })
  }

  const handleSaveButtonClick = (movie) => {
    console.log(movie.isSaved)
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
  };

  const saveMovie = (data) => {
    MainApi.saveMovie(data)
      .then((newMovie) => {
        setSavedMoviesList(savedMoviesList.data.push(newMovie));
        localStorage.setItem("savedMovies", JSON.stringify(savedMoviesList));
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const deleteMovie = (movie) => {
    MainApi.deleteMovie(movie.movieId)
      .then(() => {
        setSavedMoviesList((movies) =>
          movies.filter((m) => m.movieId !== movie.movieId && m)
        );
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    loadMovieCards();
    initialNumberOfCards();
  };

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
            {...{ moviesError, savedMoviesList }}
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
