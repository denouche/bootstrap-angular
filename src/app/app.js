angular.module('myProjectApplication', [
    'config',
    'ngRoute',
    'templates-app',
    'pascalprecht.translate',
    'hello'
])
.config(function($routeProvider) {
    'use strict';

    $routeProvider.otherwise({redirectTo:'/hello'});

})
.config(function ($translateProvider, Configuration, $translatePartialLoaderProvider) {
    'use strict';

    $translatePartialLoaderProvider.addPart('main');

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'assets/i18n/{part}/{lang}.json'
    });

    $translateProvider
        .preferredLanguage(Configuration.defaultlanguage)
        .fallbackLanguage('fr-fr');
});
