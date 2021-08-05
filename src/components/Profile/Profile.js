import React, { useState } from "react";
import Form from "../Form";
import { user } from "../../utils";

export default function Profile() {
  const [name, setName] = useState(user.name);
  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [isEditContainerVisible, setEditContainerVisible] = useState(true);

  const submitButtonClassName = `form__submit ${
    !isSubmitButtonVisible && "form__submit_type_invisible"
  }`;

  const containerClassName = `form__container ${
    !isEditContainerVisible && "form__container_type_invisible"
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
    <section className="profile">
      <Form
        title={`Привет, ${user.name}!`}
        submitButtonClass={submitButtonClassName}
        buttonText="Сохранить"
        onSubmit={handleSubmitButton}
        redirectContainer={containerClassName}
        editButton={
          <button
            className="form__edit-button"
            type="button"
            onClick={handleEditButton}
          >
            Редактировать
          </button>
        }
        redirectText=""
        redirectLink="/signin"
        type="profile"
        redirect="Выйти из аккаунта"
      >
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
      </Form>
    </section>
  );
}
