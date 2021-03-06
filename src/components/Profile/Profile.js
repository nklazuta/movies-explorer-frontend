import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useFormWithValidation } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NAME_PATTERN_MISMATCH } from "../../utils/utils";
import "./Profile.css";

export default function Profile({ isSending, onLogout, onUpdateUser, apiError, successMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isFormValid, isInputValid, handleChange, resetForm } =
    useFormWithValidation();
    const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
    const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const inputNameClassName = `profile__input profile__input_type_name ${
    !isInputValid && "profile__input_type_error"
  }`;

  const submitButtonClassName = `profile__submit ${
    !isSubmitButtonVisible && "profile__submit_type_invisible"
  } ${!isFormValid || isSending ? "profile__submit_disabled" : ""}`;

  const containerClassName = `profile__container ${
    !isEditContainerVisible && "profile__container_type_invisible"
  }`;

  const apiMessageClassName = `profile__api-message ${
    !apiError && "profile__api-message_type_success"
  }`;

  function handleNameChange(evt) {
    const input = evt.target;

    if (input.validity.patternMismatch) {
      input.setCustomValidity(NAME_PATTERN_MISMATCH);
    } else {
      input.setCustomValidity("");
    }

    handleChange(evt);
  }

  function handleEditButton() {
    setSubmitButtonVisible(true);
    setEditContainerVisible(false);
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      email: currentUser.email,
    });
    setSubmitButtonVisible(false);
    setEditContainerVisible(true);
  }

  return (
    <>
      <Header />
      <section className="profile">
        <form className="profile__form">
          <h2 className="profile__title">{`????????????, ${currentUser.name}!`}</h2>
          <label className="profile__label" htmlFor="name">
            ??????
            {isSubmitButtonVisible ? (
              <div className="profile__input-box">
                <input
                  className={inputNameClassName}
                  id="name"
                  name="name"
                  type="text"
                  pattern="[A-Za-z??-????-??????\s\-]{2,30}"
                  placeholder="??????"
                  minLength="2"
                  maxLength="30"
                  value={values.name || ""}
                  onChange={handleNameChange}
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
          <p className={apiMessageClassName}>{apiError ? apiError : successMessage}</p>
          <button
            className={submitButtonClassName}
            type="submit"
            onClick={handleSubmitButton}
            disabled={!isFormValid || isSending}
          >
            {isSending ? "????????????????????..." : "??????????????????"}
          </button>
          <div className={containerClassName}>
            <button
              className="profile__edit-button"
              type="button"
              onClick={handleEditButton}
            >
              ??????????????????????????
            </button>
            <Link
              to="/signin"
              className="profile__redirect-button"
              onClick={onLogout}
            >
              ?????????? ???? ????????????????
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
