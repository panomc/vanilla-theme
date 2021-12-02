import * as api from "$lib/api.util.server";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
  const body = await api.post("auth/register", request.body);

  if (body.error) {
    return { body };
  }

  return {
    body: {
      "result": "ok"
    },
  };
}
