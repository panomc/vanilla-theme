const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: function (resolve, reject) {
        loadComponent('Main', '/components/Pages/Main').then(resolve, reject);
      }
    }
  ]
});


// router.beforeEach((to, from, next) => {
// })

// router.afterEach((to, from) => {
//     store.state.routePageLoading = false
// })