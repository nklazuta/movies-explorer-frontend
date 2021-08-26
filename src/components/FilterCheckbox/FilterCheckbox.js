import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ onCheckBoxClick, isChecked }) {
  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor="checkbox">
        <input
          className="checkbox__button_invisible"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          placeholder="Фильм"
          value={isChecked}
          onChange={onCheckBoxClick}
          checked={isChecked}
        />
        <span className="checkbox__button"></span>
        <span className="checkbox__title">Короткометражки</span>
      </label>
    </div>
  );
}
