import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import * as MoviesApi from "../../utils/MoviesApi";
import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  MOBILE,
  INITIAL_MOBILE_NUMBER_OF_CARDS,
  TABLET,
  INITIAL_TABLET_NUMBER_OF_CARDS,
  COMPUTER,
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

  const checkWindowWidth = () => {
    setWindowWidth(document.body.clientWidth);
  };

  useEffect(() => {
    setSearchKey(localStorage.getItem("searchKey"));
    setIsCheckedCheckbox(JSON.parse(localStorage.getItem("isChecked")));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
    checkWindowWidth();
  }, []);

  useEffect(() => {
    showCards(filteredMovies);
    hideMoreButton();
  }, [currentShownCardsNumber, filteredMovies]);

  useEffect(() => {
    console.log(windowWidth);
  });

  const handleSearchChange = (evt) => {
    setSearchKey(evt.target.value);
  };

  const handleFilterCheckboxClick = () => {
    setIsCheckedCheckbox(!isCheckedCheckbox);
  };

  const moviesNotFound = (movies) => {
    const empty = movies.length < 1;
    return empty ? setMoviesError(NOT_FOUND_ERR) : setMoviesError("");
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
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByCheckbox)
      );
      return setFilteredMovies(filteredMoviesByCheckbox);
    } else {
      moviesNotFound(filteredMoviesByKey);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filteredMoviesByKey)
      );
      return setFilteredMovies(filteredMoviesByKey);
    }
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    loadMovieCards();
    initialNumberOfCards();
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

  const handleMoreButtonClick = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (TABLET) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 3);
    }
  };

  const hideMoreButton = () => {
    const tooLongArray = currentShownCardsNumber >= filteredMovies.length;
    setIsButtonHidden(tooLongArray);
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
          <MoviesCardList movies={shownMovies} {...{ moviesError }} />
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
