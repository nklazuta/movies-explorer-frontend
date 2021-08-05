import React, { useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../../utils";

export default function Profile() {
  const [name, setName] = useState(user.name);
  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  const submitButtonClassName = `form__submit ${
    isSubmitButtonVisible && "form__submit_type_visible"
  }`;

  const editContainerClassName = `form__edit-container ${
    isEditContainerVisible && "form__edit-container_type_visible"
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
    <section className="form">
      <h2 className="form__title">{`Привет, ${user.name}!`}</h2>
      <form className="form__profile">
        <label className="form__subtitle">
          Имя
          {isSubmitButtonVisible ? (
            <input
              className="form__input form__input_type_name"
              id="name-input"
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
            <input className="form__value" value={user.name} />
          )}
        </label>
        <label className="form__subtitle">
          E-mail
          <input className="form__value" value={user.mail} />
        </label>
      </form>
      <div className={editContainerClassName}>
        <button
          className="form__edit-button"
          type="button"
          onClick={handleEditButton}
        >
          Редактировать
        </button>
        <p className="form__redirect">
          <Link
            to="/signin"
            className="form__redirect-button form__redirect-button_type_profile"
          >
            Выйти из аккаунта
          </Link>
        </p>
      </div>
      <button
        className={submitButtonClassName}
        type="submit"
        onClick={handleSubmitButton}
      >
        Сохранить
      </button>
    </section>
  );
}
