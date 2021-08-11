import React from "react";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../images/photo.jpg";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <article className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__student">
        <p className="about-me__name">Надежда</p>
        <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">
          Я живу в Москве, закончила НИТУ МИСиС по направлению "Обогащение
          полезных ископаемых". У меня есть два кота, я люблю читать и занимаюсь
          йогой. Сейчас мы с мужем владеем маленькой кофейней, в которой
          выполняем большое количество функций: от бариста до управляющих. Из-за
          пандемии COVID-19 я задумалась о смене сферы деятельности на что-то
          более стабильное. Веб-разработка показалась мне интересным вариантом и
          после окончания курса я планирую найти постоянную работу в этой
          области.
        </p>
        <ul className="about-me__links">
          <li className="about-me__item">
            <a
              className="about-me__link"
              href="https://www.facebook.com/nklazuta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li className="about-me__item">
            <a
              className="about-me__link"
              href="https://github.com/nklazuta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фотография студента"
        />
      </div>
      <Portfolio />
    </article>
  );
}
