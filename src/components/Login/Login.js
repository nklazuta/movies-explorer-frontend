import React, { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Form from "../Form/Form";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

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
      >
        <label className="form__label">

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
        <label className="form__label">
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
