export default {
  routes: {
    "/": {
      component: () => import("./pages/Main.svelte"),
    },
    "/profile": {
      component: () => import("./pages/Profile.svelte"),
    },
    "/post": {
      component: () => import("./pages/Post.svelte"),
    },
    // "*": {
    //   component: () => import("./pages/Error404.svelte"),
    // },
  },
};