'use strict';

Vue.component('Header', new Promise(function (resolve) {
        axios.get('/components/Header/ui').then(function (response) {
            resolve({
                template: response.data,
            });
        });
    })
);