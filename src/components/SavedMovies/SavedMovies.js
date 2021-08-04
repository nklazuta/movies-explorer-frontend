import React from "react";
import SearchForm from "../SearchForm";
import MoviesCardList from "../MoviesCardList";
import Preloader from "../Preloader";
import Footer from "../Footer";
import { savedMovies } from "../../utils";

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
