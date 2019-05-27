'use strict';

Vue.component('Rules', new Promise(function (resolve) {
    axios.get('/components/Pages/Rules/ui').then(function (response) {
      resolve({
        template: response.data,
      });
    });
  })
);