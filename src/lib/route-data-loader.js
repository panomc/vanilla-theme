import got from "got";
import { API_URL } from "$lib/variables";
import UrlPattern from "url-pattern";

export const patterns = {
  "posts": new UrlPattern("/(blog/page/:page)"),
  "postDetail": new UrlPattern("/blog/post/(:id)"),
  "postCategoryPosts": new UrlPattern("/blog/category/(:url)(/:page)"),
};

export default async function loadRouteDataHandler(headers, path) {
  return new Promise((resolve) => {
    let resolveData = {};
    const pathsAPI = getPathsAPI(headers, path.toLowerCase(), resolveData);

    if (typeof pathsAPI === "undefined") {
      resolve({});

      return;
    }

    pathsAPI
      .then((response) => {
        // Cleanup headers
        const notAllowed = ["vary", "content-type", "content-length"];
        const headers = Object.keys(response.headers)
          .filter((key) => !notAllowed.includes(key))
          .reduce((object, key) => {
            object[key] = response.headers[key];

            return object;
          }, {});

        resolveData = {
          loadedPath: path,
          resolveData,
          data: response.body,
          headers,
        };

        console.log(headers);

        resolve(resolveData);

        // console.log("pulled DATAS server-side")
        // console.log(response.body)
      })
      .catch((e) => {
        resolve();
        console.log(e);
      });
  });
}

export function getPathsAPI(headers, path, resolveData) {
  const postsMatch = patterns["posts"].match(path);

  if (postsMatch !== null)
    return got.post(API_URL + "posts", {
      json: { page: !!postsMatch.page ? parseInt(postsMatch.page) : 1 },
      headers,
      responseType: "json",
    });

  const postDetailMatch = patterns["postDetail"].match(path);

  if (postDetailMatch !== null)
    return got.post(API_URL + "posts/detail", {
      json: { id: parseInt(postDetailMatch.id) },
      headers,
      responseType: "json",
    });

  const postCategoryPostsMatch = patterns["postCategoryPosts"].match(path);

  if (postCategoryPostsMatch !== null)
    return got.post(API_URL + "posts/categoryPosts", {
      json: {
        url: postCategoryPostsMatch.url,
        page: !!postCategoryPostsMatch.page
          ? parseInt(postCategoryPostsMatch.page)
          : 1,
      },
      headers,
      responseType: "json",
    });

  return undefined;
}
