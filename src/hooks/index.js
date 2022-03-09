import cookie from "cookie";
import {
  COOKIE_PREFIX,
  JWT_COOKIE_NAME,
  CSRF_TOKEN_COOKIE_NAME,
} from "$lib/variables";
import { getCredentialsServerSide } from "$lib/services/auth.js";


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, event: { request }, resolve }) {
  const locals = {};
  const { url } = request;

  const cookies = cookie.parse(request.headers.get("cookie") || "");

  const jwt = cookies[COOKIE_PREFIX + JWT_COOKIE_NAME];
  const CSRFToken = cookies[COOKIE_PREFIX + CSRF_TOKEN_COOKIE_NAME];

  locals.user =
    jwt &&
    !url.startsWith("/api/") &&
    !url.startsWith("/auth/") &&
    (await getCredentialsServerSide(jwt));

  locals.jwt = jwt;
  locals.CSRFToken = CSRFToken;

  event.locals = locals;

  return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }) {
  const { user, CSRFToken } = locals;

  return {
    user,
    CSRFToken,
  };
}
