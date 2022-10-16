import * as api from "$lib/api-server.util";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const body = await api.POST("auth/resetPassword", await request.text());

  return new Response(JSON.stringify(body));
}
