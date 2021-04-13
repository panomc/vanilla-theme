import got from "got";
import { API_URL } from "$lib/variables";

export default async function loadRouteDataHandler(headers, path) {
  return new Promise((resolve) => {
    const pathsAPI = getPathsAPI(path.toLowerCase());

    if (typeof pathsAPI === "undefined") {
      resolve({});

      return;
    }

    got(API_URL + pathsAPI, {
      headers,
      responseType: "json",
    })
      .then((response) => {
        resolve(response.body);
      })
      .catch((e) => {
        resolve();
        console.log(e);
      });
  });
}

function getPathsAPI(path) {
  return undefined;
}
