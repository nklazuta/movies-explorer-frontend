import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/test-data";

export default function SavedMovies() {
  const movies = savedMovies;
  const isLoading = false;

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList {...{ movies }} />}
      </main>
      <Footer />
    </>
  );
}
