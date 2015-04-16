angular.module('myProjectApplication', [
    'ngRoute',
    'templates-app',
    'hello'
])
.config(function($routeProvider) {
    'use strict';

    $routeProvider.otherwise({redirectTo:'/hello'});

});

