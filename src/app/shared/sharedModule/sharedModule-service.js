angular.module('demo-module')
.service('DemoService', function ($http, Configuration) {
    'use strict';

    this.getSomething = function() {
        return $http({
            method: 'GET',
            url: '/demo/' + Configuration.defaultlanguage
        })
        .then(function(data) {
            return data.data;
        });
    };

});
