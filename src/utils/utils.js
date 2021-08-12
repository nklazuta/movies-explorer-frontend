export const BEATFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const BASE_URL = "https://api.diplom.nlazuta.nomoredomains.monster";

export const parseResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} - ${res.statusText}`);
};

export const NOT_FOUND_ERR = "Ничего не найдено";
export const FAILED_TO_FETCH_ERR = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

const windowWidth = document.body.clientWidth;
export const MOBILE = windowWidth >= 320 && windowWidth <= 689;
export const INITIAL_MOBILE_NUMBER_OF_CARDS = 5;
export const TABLET = windowWidth > 689 && windowWidth < 1088;
export const INITIAL_TABLET_NUMBER_OF_CARDS = 8;
export const COMPUTER = windowWidth >= 1088;
export const INITIAL_COMPUTER_NUMBER_OF_CARDS = 12;