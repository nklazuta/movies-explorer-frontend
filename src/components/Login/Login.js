import React, { useState } from "react";
import Form from "../Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmitButton = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="login">
      <Form
        title="Рады видеть!"
        submitButtonClass="form__submit"
        buttonText="Войти"
        onSubmit={handleSubmitButton}
        redirectContainer="form__container"
        editButton=""
        redirectText="Ещё не зарегистрированы?"
        redirectLink="/signup"
        type="login"
        redirect="Регистрация"
      >
        <label className="form__subtitle">
          E-mail
          <input
            className="form__input form__input_type_email"
            id="email"
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className="form__subtitle">
          Пароль
          <input
            className="form__input form__input_type_password"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </Form>
    </section>
  );
}
