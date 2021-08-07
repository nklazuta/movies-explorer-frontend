import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { movies } from "../../utils/test-data";

export default function Movies() {
  const isLoading = true;

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {!isLoading ? <MoviesCardList {...{ movies }} /> : <Preloader />}
      </main>
      <Footer />
    </>
  );
}
