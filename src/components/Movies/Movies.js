import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import * as MoviesApi from "../../utils/MoviesApi";
import "./Movies.css";

export default function Movies() {
  const isLoading = false;

  const [movies, seMovies] = useState([]);

  useEffect(() => {
    loadMovieCards();
  }, []);

  const loadMovieCards = () => {
    MoviesApi
      .getMovies()
      .then((res) => seMovies(res))
      .catch((err) => console.log("Ошибка: ", err));
  };

  console.log(movies);

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList {...{ movies }} />}
        <button className="movies__more-button" type="button">Ещё</button>
      </main>
      <Footer />
    </>
  );
}
