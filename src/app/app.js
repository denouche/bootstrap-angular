angular.module('myProjectApplication', [
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'config',
    'templates-app',
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
    
    $translateProvider.useSanitizeValueStrategy('escape');
})
.config(function(tmhDynamicLocaleProvider, Configuration) {
     'use strict';
     tmhDynamicLocaleProvider.defaultLocale(Configuration.defaultlanguage);
     tmhDynamicLocaleProvider.localeLocationPattern('assets/libs/angular-i18n/angular-locale_{{locale}}.js');
})
.run(function ($rootScope, $translate) {
    'use strict';

    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
    });

});
