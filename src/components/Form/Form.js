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
  isDisabled,
  apiError,
}) {
  const submitButtonClassName = `form__submit form__submit_type_${type} ${
    isDisabled && "form__submit_disabled"
  }`;

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form__title">{title}</h2>
      {children}
      <p className="form__api-error">{apiError}</p>
      <button
        className={submitButtonClassName}
        type="submit"
        disabled={isDisabled}
      >
        {buttonText}
      </button>
      <p className="form__redirect">
        {redirectText}
        <Link to={redirectLink} className="form__redirect-button">
          {redirect}
        </Link>
      </p>
    </form>
  );
}
