import ApiUtil from "$lib/api.util.js";

export const getCategoryPosts = async ({ page, url, request, csrfToken }) => {
  return ApiUtil.get({
    path: `/api/posts?page=${page}&categoryUrl=${url}`,
    request,
    csrfToken
  }).then((body) => {
    body.page = parseInt(page);
    body.url = url;

    return body;
  });
};

export const getPosts = async ({ page, request, csrfToken }) => {
  return ApiUtil.get({
    path: `/api/posts?page=${page}`,
    request,
    csrfToken
  }).then((body) => {
    body.page = parseInt(page);

    return body;
  });
};

export const getPostDetail = async ({ url, request, csrfToken }) => {
  return ApiUtil.post({
    path: `/api/posts/${url}`,
    request,
    csrfToken
  }).then((body) => {
    body.url = url;

    return body;
  });
};

export const getPostPreview = async ({ id, request, csrfToken }) => {
  return ApiUtil.get({
    path: `/api/panel/posts/${id}/preview`,
    request,
    csrfToken
  }).then((body) => {
    body.id = parseInt(id);

    return body;
  });
};
