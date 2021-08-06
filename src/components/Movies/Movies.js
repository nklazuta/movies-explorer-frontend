import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { movies } from "../../utils/test-data";

export default function Movies() {
  const isLoading = false;

  return (
    <main className="main">
      <SearchForm />
      {!isLoading ? <MoviesCardList {...{ movies }} /> : <Preloader />}
      <Footer />
    </main>
  );
}
