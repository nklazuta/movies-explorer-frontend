import React from "react";

export default function AboutProject() {
  return (
    <article className="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__text">
          <p className="about-project__title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__text">
          <p className="about-project__title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__time-box">
        <div className="about-project__weeks">
          <p className="about-project__time about-project__time_type_backend">
            1 неделя
          </p>
          <p className="about-project__work">Back-end</p>
        </div>
        <div className="about-project__weeks">
          <p className="about-project__time">4 недели</p>
          <p className="about-project__work">Front-end</p>
        </div>
      </div>
    </article>
  );
}
