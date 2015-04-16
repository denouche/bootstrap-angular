angular.module('hello', [])
.config(function($routeProvider) {
    'use strict';

    $routeProvider.when('/hello', {
        templateUrl: 'app/components/hello/hello-view.html',
        controller : 'HelloController'
    });

});
