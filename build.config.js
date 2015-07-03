'use strict';
module.exports = {
    src: {
        js: [
            'src/config/**/*.js',
            'src/app/**/*-module.js',
            'src/app/**/*-service.js',
            'src/app/**/*-directive.js',
            'src/app/**/*-controller.js',
            'src/app/app.js'
        ],
        css: [
            'src/assets/css/*.css'
        ]
    },
    common: {
        js: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-translate/angular-translate.min.js',
            'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/lodash/dist/lodash.min.js'
        ],
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        assets: [
            'bower_components/bootstrap/dist/fonts/glyphicons-*'
        ]
    }
};


