import ApiUtil from "$lib/api.util";
import * as api from "$lib/api.util.server.js";

export const sendLogout = async (CSRFToken) => {
  return ApiUtil.post({
    path: "/auth/logout",
    CSRFToken,
  });
};

export const sendLogin = async (body) => {
  return ApiUtil.post({
    path: "/auth/login",
    body,
  });
};

export const getCredentials = async (CSRFToken) => {
  return ApiUtil.get({
    path: "/api/auth/credentials",
    CSRFToken,
  });
};

export const getCredentialsServerSide = async (token) => {
  return api.get("/api/auth/credentials", token).then((response) => {
    if (response.result !== "ok") {
      return null;
    }

    return Object.keys(response)
      .filter((key) => !["result"].includes(key))
      .reduce((object, key) => {
        object[key] = response[key];

        return object;
      }, {});
  });
};

export const sendRegister = async (body) => {
  return ApiUtil.post({
    path: "/auth/register",
    body,
  });
};
