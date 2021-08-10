export const BEATFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const BASE_URL = "https://api.diplom.nlazuta.nomoredomains.monster";

export const parseResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} - ${res.statusText}`);
};
