import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/test-data";

export default function SavedMovies() {
  const isLoading = false;
  const movies = savedMovies;

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        {!isLoading ? <MoviesCardList {...{ movies }} /> : <Preloader />}
      </main>
      <Footer />
    </>
  );
}
