import cookie from "cookie";
import * as api from "$lib/api.util.server";
import {
  COOKIE_PREFIX,
  JWT_COOKIE_NAME,
  CSRF_TOKEN_COOKIE_NAME,
} from "$lib/variables";

async function fetchCredentials(token) {
  return api.get("auth/credentials", token).then((response) => {
    if (response.result === "ok") {
      return Object.keys(response)
        .filter((key) => !["result"].includes(key))
        .reduce((object, key) => {
          object[key] = response[key];

          return object;
        }, {});
    } else {
      return null;
    }
  });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
  const locals = {};
  const { path } = request;

  const cookies = cookie.parse(request.headers.cookie || "");

  const jwt = cookies[COOKIE_PREFIX + JWT_COOKIE_NAME];
  const CSRFToken = cookies[COOKIE_PREFIX + CSRF_TOKEN_COOKIE_NAME];

  locals.user =
    jwt &&
    !path.startsWith("/api/") &&
    !path.startsWith("/auth/") &&
    (await fetchCredentials(jwt));

  locals.jwt = jwt;
  locals.CSRFToken = CSRFToken;

  request.locals = locals;

  return await resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }) {
  const { user, CSRFToken } = locals;

  return {
    user,
    CSRFToken,
  };
}
