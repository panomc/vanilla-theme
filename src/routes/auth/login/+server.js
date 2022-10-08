import * as api from "$lib/api-server.util";
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

  const headers = new Headers();
  let CSRFToken;

  if (body.result === "ok") {
    CSRFToken = generateToken();

    headers.append(
      "set-cookie",
      cookie.serialize(COOKIE_PREFIX + JWT_COOKIE_NAME, body.jwt, {
        httpOnly: true,
        path: "/",
      })
    );

    headers.append(
      "set-cookie",
      cookie.serialize(COOKIE_PREFIX + CSRF_TOKEN_COOKIE_NAME, CSRFToken, {
        httpOnly: true,
        path: "/",
      })
    );
  }

  return new Response(JSON.stringify({ ...body, CSRFToken }), { headers });
}
