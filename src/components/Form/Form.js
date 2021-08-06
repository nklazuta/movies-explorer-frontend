import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({
  title,
  submitButtonClass,
  buttonText,
  onSubmit,
  children,
  redirectContainer,
  editButton,
  redirectText,
  redirectLink,
  type,
  redirect,
}) {
  return (
    <form className="form__register">
      <h2 className="form__title">{title}</h2>
      {children}
      <button className={submitButtonClass} type="submit" onClick={onSubmit}>
        {buttonText}
      </button>
      <div className={redirectContainer}>
        {editButton}
        <p className="form__redirect">
          {redirectText}
          <Link
            to={redirectLink}
            className={`form__redirect-button form__redirect-button_type_${type}`}
          >
            {redirect}
          </Link>
        </p>
      </div>
    </form>
  );
}
