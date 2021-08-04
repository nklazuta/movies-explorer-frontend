import React from "react";
import SearchForm from "../SearchForm";
import MoviesCardList from "../MoviesCardList";
import Preloader from "../Preloader";
import Footer from "../Footer";
import { movies } from "../../utils";

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
