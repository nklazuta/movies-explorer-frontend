import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useFormWithValidation } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({ isSending, onLogout, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isFormValid, isInputValid, handleChange, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  const inputNameClassName = `profile__input profile__input_type_name ${
    !isInputValid && "profile__input_type_error"
  }`;

  const submitButtonClassName = `profile__submit ${
    !isSubmitButtonVisible && "profile__submit_type_invisible"
  } ${!isFormValid || isSending ? "profile__submit_disabled" : ""}`;

  const containerClassName = `profile__container ${
    !isEditContainerVisible && "profile__container_type_invisible"
  }`;

  function handleEditButton() {
    setSubmitButtonVisible(true);
    setEditContainerVisible(false);
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      email: currentUser.mail,
    });
    setSubmitButtonVisible(false);
    setEditContainerVisible(true);
  }

  return (
    <>
      <Header />
      <section className="profile">
        <form className="profile__form">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <label className="profile__label" htmlFor="name">
            Имя
            {isSubmitButtonVisible ? (
              <div className="profile__input-box">
                <input
                  className={inputNameClassName}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Имя"
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
              <input
                className="profile__value"
                value={currentUser.name}
                disabled
              />
            )}
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__value"
              value={currentUser.email}
              disabled
            />
          </label>
          <button
            className={submitButtonClassName}
            type="submit"
            onClick={handleSubmitButton}
            disabled={!isFormValid || isSending}
          >
            {isSending ? "Сохранение..." : "Сохранить"}
          </button>
          <div className={containerClassName}>
            <button
              className="profile__edit-button"
              type="button"
              onClick={handleEditButton}
            >
              Редактировать
            </button>
            <Link
              to="/signin"
              className="profile__redirect-button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
