import { handleResponse } from "../helpers";

export const visitorService = {
  getConfig,
  createInfoVisitor,
  updateInfoVisitor,
  createVisitor,
  updateVisitor,
};

function getConfig() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/configurazionis?organisation=${process.env.REACT_APP_ORG}`,
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
function createVisitor(params) {
  var orgId = process.env.REACT_APP_ORG;
  params.organisation = orgId;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/visitatoris/public/${orgId}`,
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

function updateVisitor(params, visitorId) {
  var orgId = process.env.REACT_APP_ORG;
  params.organisation = orgId;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/visitatoris/public/${orgId}/${visitorId}`,
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
function createInfoVisitor(params) {
  var orgId = process.env.REACT_APP_ORG;
  params.organisation = orgId;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/info-visitatoris/public/${orgId}`,
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

function updateInfoVisitor(params, visitorId) {
  var orgId = process.env.REACT_APP_ORG;
  params.organisation = orgId;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/info-visitatoris/public/${orgId}/${visitorId}`,
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
