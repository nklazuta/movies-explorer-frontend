import React, { useState } from "react";
import HeaderLogo from "../HeaderLogo";
import Form from "../Form";
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

  const handleSubmitButton = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="register">
      <HeaderLogo />
      <Form
        title="Добро пожаловать!"
        submitButtonClass="form__submit"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmitButton}
        redirectContainer="form__container"
        editButton=""
        redirectText="Уже зарегистрированы?"
        redirectLink="/signin"
        type="register"
        redirect="Войти"
      >
        <label className="form__subtitle">
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
