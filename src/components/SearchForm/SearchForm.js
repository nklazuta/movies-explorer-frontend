import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// import { useSearchWithValidation } from "../../hooks/useForm";
import "./SearchForm.css";

export default function SearchForm({
  onSubmit,
  onSearchChange,
  onCheckBoxClick,
  searchKey,
  isChecked,
}) {
  // const { values, errors, isValid, handleChange } =
  //   useSearchWithValidation();

  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit}>
        <div className="search__box">
          <div className="search__logo" />
          <input
            className="search__input"
            id="search"
            type="search"
            name="search"
            placeholder="Фильм"
            value={searchKey || ""}
            onChange={onSearchChange}
            required
          />
          <button
            className="search__button"
            type="submit"
            aria-label="Искать"
          />
        </div>
        <FilterCheckbox {...{ onCheckBoxClick, isChecked }} />
      </form>
    </section>
  );
}
