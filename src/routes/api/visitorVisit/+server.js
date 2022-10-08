import * as api from "$lib/api-server.util";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST(event) {
  const body = await api.POST(
    "visitorVisit",
    JSON.stringify({ ipAddress: event.getClientAddress() })
  );

  return new Response(JSON.stringify(body));
}
