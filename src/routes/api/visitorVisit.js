import * as api from "$lib/api.util.server";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ clientAddress }) {
  const body = await api.POST("visitorVisit", JSON.stringify({ ipAddress:clientAddress }));

  return { body };
}
