import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { movies } from "../../utils/test-data";

export default function Movies() {
  const isLoading = false;

  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        {!isLoading ? <MoviesCardList {...{ movies }} /> : <Preloader />}
      </main>
      <Footer />
    </>
  );
}
