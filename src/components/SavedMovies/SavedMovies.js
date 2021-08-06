import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { savedMovies } from "../../utils/test-data";

export default function SavedMovies() {
  const isLoading = false;
  const movies = savedMovies;

  return (
    <main className="main">
      <SearchForm />
      {!isLoading ? <MoviesCardList {...{ movies }} /> : <Preloader />}
      <Footer />
    </main>
  );
}
