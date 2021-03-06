export const BEATFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const MAIN_URL = "https://api.diplom.nlazuta.nomoredomains.monster";

export const parseResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} - ${res.statusText}`);
};

export const NOT_FOUND_ERR = "Ничего не найдено";
export const FAILED_TO_FETCH_ERR =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const NAME_PATTERN_MISMATCH =
  "Имя должно быть не короче 2 симв. и может содержать только латиницу, кириллицу, пробел или дефис";
export const SEARCH_VALUE_MISSING = "Нужно ввести ключевое слово";

export const SUCCESS_MESSAGE = "Имя успешно изменено";

export const INITIAL_MOBILE_NUMBER_OF_CARDS = 5;
export const INITIAL_TABLET_NUMBER_OF_CARDS = 8;
export const INITIAL_COMPUTER_NUMBER_OF_CARDS = 12;

export const SHORT_FILM_DURATION = 60;
