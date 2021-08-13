import { MAIN_URL, parseResponse } from "./utils";

export const getMovies = () => {
  return fetch(`${MAIN_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => parseResponse(res));
};

export const saveMovie = (data) => {
  return fetch(`${MAIN_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => parseResponse(res));
};

export const deleteMovie = (movieId) => {
  return fetch(`${MAIN_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => parseResponse(res));
};
