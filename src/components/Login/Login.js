import React from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/useForm";
import "./Login.css";

export default function Login() {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="login">
      <HeaderLogo />
      <Form
        title="Рады видеть!"
        type="login"
        buttonText="Войти"
        onSubmit={handleSubmit}
        redirectText="Ещё не зарегистрированы?"
        redirectLink="/signup"
        redirect="Регистрация"
        isDisabled={!isValid}
      >
        <label className="form__label">
          E-mail
          <input
            className={`form__input form__input_type_email ${
              !isValid && "form__input_type_error"
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
        <label className="form__label">
          Пароль
          <input
            className={`form__input form__input_type_password ${
              !isValid && "form__input_type_error"
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
