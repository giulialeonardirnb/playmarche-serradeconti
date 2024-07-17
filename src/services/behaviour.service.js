import { handleResponse } from "../helpers";

export const behaviorService = {
  createBehaviour,
};

function createBehaviour(params) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/comportamento-utentes`,
    requestOptions
  )
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return false;
    });
}
