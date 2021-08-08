import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { movies } from "../../utils/test-data";

export default function Movies() {
  const isLoading = false;

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList {...{ movies }} />}
      </main>
      <Footer />
    </>
  );
}
