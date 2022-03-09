import ApiUtil from "$lib/api.util.js";

export const getCategoryPosts = async ({ page, url, request, CSRFToken }) => {
  return await ApiUtil.post({
    path: "/api/posts/categoryPosts",
    body: {
      page: parseInt(page),
      url,
    },
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);
    body.url = url;

    return body;
  });
};

export const getPosts = async ({ page, request, CSRFToken }) => {
  return await ApiUtil.post({
    path: "/api/posts",
    body: { page: parseInt(page) },
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);

    return body;
  });
};

export const getPostDetail = async ({ id, request, CSRFToken }) => {
  return await ApiUtil.post({
    path: "/api/posts/detail",
    body: {
      id: parseInt(id),
    },
    request,
    CSRFToken,
  }).then((body) => {
    body.id = parseInt(id);

    return body;
  });
};

export const getPostPreview = async ({ id, request, CSRFToken }) => {
  ApiUtil.post({
    path: "/api/panel/post/preview",
    body: {
      id: parseInt(id),
    },
    request,
    CSRFToken,
  }).then((body) => {
    body.id = parseInt(id);

    return body;
  });
};
