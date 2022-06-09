import ApiUtil from "../api.util.js";

export const getTickets = async ({ page, pageType, request, CSRFToken }) => {
  return ApiUtil.get({
    path: `/api/tickets?page=${page}&pageType=${pageType}`,
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);
    body.pageType = pageType;

    return body;
  });
};

export const getCategoryTickets = async ({ page, url, request, CSRFToken }) => {
  return ApiUtil.get({
    path: `/api/tickets?page=${page}&categoryUrl=${url}`,
    request,
    CSRFToken,
  }).then((body) => {
    body.page = parseInt(page);
    body.url = url;

    return body;
  });
};

export const closeTicket = async ({ id, request, CSRFToken }) => {
  return ApiUtil.put({
    path: `/api/tickets/${id}`,
    body: {
      status: "close"
    },
    request,
    CSRFToken,
  })
};