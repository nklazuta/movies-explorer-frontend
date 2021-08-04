import React from "react";
import logo from "../../images/landing-logo.svg";

export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img
        className="promo__logo"
        src={logo}
        alt="Логотип страницы о проекте"
      />
    </section>
  );
}
