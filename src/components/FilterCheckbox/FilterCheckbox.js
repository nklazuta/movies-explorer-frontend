import { useState } from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(true);

  const handleFilterCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__label" for="checkbox">
        <input
          className="checkbox__button_invisible"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          placeholder="Фильм"
          value={isChecked}
          onChange={handleFilterCheckboxClick}
        />
        <span className="checkbox__button"></span>
        <span className="checkbox__title">Короткометражки</span>
      </label>
    </div>
  );
}
