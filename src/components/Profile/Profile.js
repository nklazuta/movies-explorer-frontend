import React, { useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../../utils";

export default function Profile() {
  const [name, setName] = useState(user.name);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  return (
    <section className="form">
      <h2 className="form__title">{`Привет, ${user.name}!`}</h2>
      <form className="form__profile">
        <label className="form__subtitle">
          Имя
          <input
            className="form__input form__input_type_name"
            id="name-input"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <label className="form__subtitle">
          E-mail
          <input className="form__value" value={user.mail} />
        </label>
      </form>
      <button className="form__submit form__submit_type_profile" type="submit">
        Редактировать
      </button>
      <p className="form__redirect">
        <Link to="/signin" className="form__redirect-button form__redirect-button_type_profile">
          Выйти из аккаунта
        </Link>
      </p>
    </section>
  );
}
