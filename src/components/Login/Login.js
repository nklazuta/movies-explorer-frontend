import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <section className="form">
      <h2 className="form__title">Рады видеть!</h2>
      <form className="form__login">
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
          Войти
        </button>
      </form>
      <p className="form__redirect">
        Ещё не зарегистрированы?{" "}
        <Link to="/signin" className="form__redirect-button">
          Регистрация
        </Link>
      </p>
    </section>
  );
}
