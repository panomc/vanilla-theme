import routeDataLoader from "$lib/route-data-loader";

/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext({ headers, path }) {
  const routeData = await routeDataLoader(headers, path);

  return { headers, path, routeData };
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ context }) {
  const notAllowed = ["headers"];

  return Object.keys(context.routeData)
    .filter((key) => !notAllowed.includes(key))
    .reduce((object, key) => {
      object[key] = context.routeData[key];

      return object;
    }, {});
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
  const response = await render(request);

  return {
    ...response,
    headers: {
      ...response.headers,
      ...request.context.routeData.headers,
    },
  };
}
