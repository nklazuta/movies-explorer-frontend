import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({
  title,
  onSubmit,
  children,
  type,
  buttonText,
  redirectText,
  redirectLink,
  redirect,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form__title">{title}</h2>
      {children}
      <button className={`form__submit form__submit_type_${type}`} type="submit">
        {buttonText}
      </button>
        <p className="form__redirect">
          {redirectText}
          <Link
            to={redirectLink}
            className="form__redirect-button"
          >
            {redirect}
          </Link>
        </p>
    </form>
  );
}
