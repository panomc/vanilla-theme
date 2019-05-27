const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: function (resolve, reject) {
        loadComponent('Main', '/components/Pages/Main').then(resolve, reject);
      }
    },
    {
      path: '/rules',
      name: 'Rules',
      component: function (resolve, reject) {
        loadComponent('Rules', '/components/Pages/Rules').then(resolve, reject);
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: function (resolve, reject) {
        loadComponent('Profile', '/components/Pages/Profile').then(resolve, reject);
      }
    }
  ]
});


// router.beforeEach((to, from, next) => {
// })

// router.afterEach((to, from) => {
//     store.state.routePageLoading = false
// })