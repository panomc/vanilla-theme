import routeDataLoader from "$lib/route-data-loader";

/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext({ headers, path }) {
  return { headers, path };
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ context }) {
  return await routeDataLoader(context.headers, context.path);
}
