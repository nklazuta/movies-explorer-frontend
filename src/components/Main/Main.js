import React from "react";
import Promo from "../Promo";
import AboutProject from "../AboutProject";
import Techs from "../Techs";
import AboutMe from "../AboutMe";
import Footer from "../Footer";
import "./Main.css";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </main>
  );
}
