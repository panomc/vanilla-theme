export default {
  routes: {
    "/": {
      component: () => import("./pages/Main.svelte"),
    },
    "/profile": {
      component: () => import("./pages/Profile.svelte"),
    },
    // "*": {
    //   component: () => import("./pages/Error404.svelte"),
    // },
  },
};
