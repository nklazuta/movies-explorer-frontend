import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useFormWithValidation } from "../../hooks/useForm";
import "./Profile.css";
import { user } from "../../utils/test-data";

export default function Profile() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  const inputNameClassName = `profile__input profile__input_type_name ${
    !isValid && "profile__input_type_error"
  }`;

  const submitButtonClassName = `profile__submit ${
    !isSubmitButtonVisible && "profile__submit_type_invisible"
  } ${!isValid && "form__submit_disabled"}`;

  const containerClassName = `profile__container ${
    !isEditContainerVisible && "profile__container_type_invisible"
  }`;

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
              <div className="profile__input-box">
                <input
                  className={inputNameClassName}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Виталий"
                  minLength="2"
                  maxLength="30"
                  value={values.name || ""}
                  onChange={handleChange}
                  required
                />
                <span className="profile__error" id="name-error">
                  {errors.name || ""}
                </span>
              </div>
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
            disabled={!isValid}
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
