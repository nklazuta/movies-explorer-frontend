import React, { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Form from "../Form/Form";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

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
    <section className="register">
      <HeaderLogo />
      <Form
        title="Добро пожаловать!"
        type="register"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        redirectText="Уже зарегистрированы?"
        redirectLink="/signin"
        redirect="Войти"
      >
        <label className="form__label">
          Имя
          <input
            className="form__input form__input_type_name"
            id="name"
            name="name"
            type="text"
            placeholder="Виталий"
            autoComplete="name"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
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
