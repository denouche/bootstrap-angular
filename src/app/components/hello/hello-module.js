angular.module('hello', [])
.config(function($routeProvider) {
    'use strict';

    $routeProvider.when('/hello', {
        templateUrl: 'app/components/hello/hello-view.html',
        controller : 'HelloController',
        resolve: {
            translations: function ($translatePartialLoader, $translate) {
                $translatePartialLoader.addPart('hello');
                return $translate.refresh();
            }
        }
    });

});
