import ApiUtil from "$lib/api.util.js";

export const getCategoryPosts = async ({ page, url, request, CSRFToken }) => {
  return ApiUtil.get({
    path: `/api/posts?page=${page}&categoryUrl=${url}`,
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);
    body.url = url;

    return body;
  });
};

export const getPosts = async ({ page, request, CSRFToken }) => {
  return ApiUtil.get({
    path: `/api/posts?page=${page}`,
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);

    return body;
  });
};

export const getPostDetail = async ({ id, request, CSRFToken }) => {
  return ApiUtil.post({
    path: `/api/posts/${id}`,
    request,
    CSRFToken,
  }).then((body) => {
    body.id = parseInt(id);

    return body;
  });
};

export const getPostPreview = async ({ id, request, CSRFToken }) => {
  ApiUtil.get({
    path: `/api/panel/posts/${id}/preview`,
    request,
    CSRFToken,
  }).then((body) => {
    body.id = parseInt(id);

    return body;
  });
};
