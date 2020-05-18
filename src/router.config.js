export default {
  routes: {
    "/": {
      component: () => import("./pages/Main.svelte"),
    },
    // "*": {
    //   component: () => import("./pages/Error404.svelte"),
    // },
  },
};
