import * as api from "$lib/api.util.server";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const body = await api.POST("auth/register", await request.text());

  if (body.error) {
    return { body };
  }

  return {
    body: {
      "result": "ok",
    },
  };
}
