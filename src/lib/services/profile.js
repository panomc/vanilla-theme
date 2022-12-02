import ApiUtil from "$lib/api.util.js";

export const getProfile = async ({ request }) => {
  return ApiUtil.get({
    path: `/api/profile`,
    request
  })
};

