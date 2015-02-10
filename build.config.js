'use strict';
module.exports = {
    src: {
        js: [
            'src/app/services.js',
            'src/app/components/**/*-service.js',
            'src/app/directives.js',
            'src/app/components/**/*-directive.js',
            'src/app/controllers.js',
            'src/app/components/**/*-controller.js',
            'src/app/app.js',
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
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/lodash/dist/lodash.min.js'
        ],
        css: [
        ]
    }
};


