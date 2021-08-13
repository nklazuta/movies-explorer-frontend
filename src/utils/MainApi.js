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

export const register = ({ email, password, name }) => {
  return fetch(`${MAIN_URL}/signup`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((res) => parseResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(`${MAIN_URL}/signin`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => parseResponse(res));
};

export const logout = () => {
  return fetch(`${MAIN_URL}/signout`, {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  }).then((res) => parseResponse(res));
};

export const getUser = () => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => parseResponse(res));
};

export const updateUser = ({ name, email }) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => parseResponse(res));
};
