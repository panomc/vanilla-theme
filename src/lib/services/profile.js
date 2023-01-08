import ApiUtil from "$lib/api.util.js";

export const getProfile = async ({ request }) => {
  return ApiUtil.get({
    path: `/api/profile`,
    request
  })
};

export const getPlayerProfile = async ({ request, username }) => {
  return ApiUtil.get({
    path: `/api/profile/${username}`,
    request
  })
};

export const sendResetPassword = async () => {
  return ApiUtil.post({
    path: "/api/profile/resetPassword"
  });
};