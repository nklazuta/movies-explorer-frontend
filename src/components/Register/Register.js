import React, { useEffect } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/useForm";
import { NAME_PATTERN_MISMATCH } from "../../utils/utils";
import "./Register.css";

export default function Register({ onRegister, isSending, apiError }) {
  const { values, errors, isFormValid, isInputValid, handleChange, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm({});
  }, [resetForm]);

  function handleNameChange(evt) {
    const input = evt.target;

    if (input.validity.patternMismatch) {
      input.setCustomValidity(NAME_PATTERN_MISMATCH);
    } else {
      input.setCustomValidity("");
    }

    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="register">
      <HeaderLogo />
      <Form
        title="Добро пожаловать!"
        type="register"
        buttonText={isSending ? "Сохранение..." : "Зарегистрироваться"}
        onSubmit={handleSubmit}
        redirectText="Уже зарегистрированы?"
        redirectLink="/signin"
        redirect="Войти"
        isDisabled={!isFormValid || isSending}
        {...{ apiError }}
      >
        <label className="form__label" htmlFor="name">
          Имя
          <input
            className={`form__input form__input_type_name ${
              !isInputValid && "form__input_type_error"
            }`}
            id="name"
            name="name"
            type="text"
            pattern="[A-Za-zА-Яа-яЁё\s\-]{2,30}"
            placeholder="Виталий"
            autoComplete="name"
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            required
            onChange={handleNameChange}
          />
          <span className="form__error" id="name-error">
            {errors.name || ""}
          </span>
        </label>
        <label className="form__label" htmlFor="email">
          E-mail
          <input
            className={`form__input form__input_type_email ${
              !isInputValid && "form__input_type_error"
            }`}
            id="email"
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            autoComplete="email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className="form__error" id="email-error">
            {errors.email || ""}
          </span>
        </label>
        <label className="form__label" htmlFor="password">
          Пароль
          <input
            className={`form__input form__input_type_password ${
              !isInputValid && "form__input_type_error"
            }`}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <span className="form__error" id="password-error">
            {errors.password || ""}
          </span>
        </label>
      </Form>
    </section>
  );
}
