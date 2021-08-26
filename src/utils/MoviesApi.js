import { BEATFILM_URL, parseResponse } from "./utils";

export const getMovies = () => {
  return fetch(BEATFILM_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then((res) => parseResponse(res))
};
