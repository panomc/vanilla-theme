import * as api from "$lib/api.util.server";
import {
  COOKIE_PREFIX,
  CSRF_TOKEN_COOKIE_NAME,
  JWT_COOKIE_NAME,
} from "$lib/variables";
import cookie from "cookie";
import generateToken from "$lib/csrf.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const body = await api.POST("auth/login", await request.text());

  if (body.error) {
    return { body };
  }

  const CSRFToken = generateToken();

  return {
    headers: {
      "set-cookie": [
        cookie.serialize(COOKIE_PREFIX + JWT_COOKIE_NAME, body.jwt, {
          httpOnly: true,
          path: "/",
        }),
        cookie.serialize(COOKIE_PREFIX + CSRF_TOKEN_COOKIE_NAME, CSRFToken, {
          httpOnly: true,
          path: "/",
        }),
      ],
    },
    body: {
      "result": "ok",
      CSRFToken,
    },
  };
}
