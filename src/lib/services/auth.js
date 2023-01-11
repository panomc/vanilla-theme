import ApiUtil from "$lib/api.util";
import * as api from "$lib/api-server.util.js";

export const sendLogout = async () => {
  return ApiUtil.post({
    path: "/auth/logout",
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
  return api.GET({ path: "/api/auth/credentials", token }).then((response) => {
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

export const sendVerifyEmail = async (token) => {
  return ApiUtil.post({
    path: "/api/auth/verifyEmail",
    body: { token },
  });
};

export const sendVerifyNewEmail = async (token) => {
  return ApiUtil.post({
    path: "/api/auth/verifyNewEmail",
    body: { token },
  });
};

export const sendResetPassword = async (usernameOrEmail) => {
  return ApiUtil.post({
    path: "/auth/resetPassword",
    body: { usernameOrEmail },
  });
};

export const sendRenewPassword = async (
  newPassword,
  newPasswordRepeat,
  token
) => {
  return ApiUtil.post({
    path: "/auth/renewPassword",
    body: { newPassword, newPasswordRepeat, token },
  });
};
