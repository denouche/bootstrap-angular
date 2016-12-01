'use strict';
module.exports = {
    src: {
        config: [
            'src/config/config.js'
        ],
        js: [
            'src/app/**/*-module.js',
            'src/app/**/*-service.js',
            'src/app/**/*-directive.js',
            'src/app/**/*-controller.js',
            'src/app/**/*-constant.js',
            'src/app/app.js',
        ],
        css: [
            'src/assets/css/*.css'
        ]
    },
    common: {
        js: [
            'node_modules/moment/min/moment.min.js',
            'node_modules/lodash/lodash.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js',
            'node_modules/angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
            'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-touch/angular-touch.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
        ],
        assets: [
            'node_modules/bootstrap/dist/fonts/glyphicons-*',
            'node_modules/angular-i18n/angular-locale_fr-fr.js'
        ]
    }
};


