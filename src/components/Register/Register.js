import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <section className="form">
      <h2 className="form__title">Добро пожаловать!</h2>
      <form className="form__register">
        <label className="form__subtitle">
          Имя
          <input
            className="form__input form__input_type_name"
            id="name"
            name="name"
            type="text"
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
            autoComplete="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button className="form__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="form__redirect">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="form__redirect-button">
          Войти
        </Link>
      </p>
    </section>
  );
}
