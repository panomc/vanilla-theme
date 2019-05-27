'use strict';

Vue.component('Profile', new Promise(function (resolve) {
    axios.get('/components/Pages/Profile/ui').then(function (response) {
      resolve({
        template: response.data,
      });
    });
  })
);