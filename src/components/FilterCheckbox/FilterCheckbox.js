import { useState } from "react";

export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(true);

  const checkboxClassName = `checkbox__button ${
    isChecked && "checkbox__button_active"
  }`;

  const handleFilterCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox">
      <button
        className={checkboxClassName}
        type="button"
        aria-label="Искать кроткометражки"
        onClick={handleFilterCheckboxClick}
      />
      <p className="checkbox__title">Короткометражки</p>
    </div>
  );
}
