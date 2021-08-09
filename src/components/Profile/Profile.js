import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import { user } from "../../utils/test-data";

export default function Profile() {
  const [name, setName] = useState(user.name);
  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  const submitButtonClassName = `profile__submit ${
    !isSubmitButtonVisible && "profile__submit_type_invisible"
  }`;

  const containerClassName = `profile__container ${
    !isEditContainerVisible && "profile__container_type_invisible"
  }`;

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleEditButton = () => {
    setSubmitButtonVisible(true);
    setEditContainerVisible(false);
  };

  const handleSubmitButton = (evt) => {
    evt.preventDefault();
    setSubmitButtonVisible(false);
    setEditContainerVisible(true);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <form className="profile__form">
          <h2 className="profile__title">{`Привет, ${user.name}!`}</h2>
          <label className="profile__label">
            Имя
            {isSubmitButtonVisible ? (
              <input
                className="profile__input profile__input_type_name"
                id="name"
                name="name"
                type="text"
                placeholder="Виталий"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
                required
              />
            ) : (
              <input className="profile__value" value={user.name} disabled />
            )}
          </label>
          <label className="profile__label">
            E-mail
            <input className="profile__value" value={user.mail} disabled />
          </label>
          <button
            className={submitButtonClassName}
            type="submit"
            onClick={handleSubmitButton}
          >
            Сохранить
          </button>
          <div className={containerClassName}>
            <button
              className="profile__edit-button"
              type="button"
              onClick={handleEditButton}
            >
              Редактировать
            </button>
            <Link to="/signin" className="profile__redirect-button">
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
