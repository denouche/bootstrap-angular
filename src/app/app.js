angular.module('chfeirPlanningApplication', ['ngRoute', 'chfeirPlanningDirectives', 'chfeirPlanningServices', 'chfeirPlanningControllers', 'templates-app'])
.config(function($routeProvider) {
    'use strict';

    $routeProvider.when('/hello', {
        templateUrl: 'app/components/hello/hello-view.html',
        controller : 'HelloController'
    });

    $routeProvider.otherwise({redirectTo:'/hello'});

});

