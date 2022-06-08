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