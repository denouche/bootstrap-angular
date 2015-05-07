module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);
    
    var mode = grunt.option('mode') || 'dev';

    var assets = require('./build.config');

    function sanitizeDistFilename (filename) {
        return filename.replace(/^dist\//, '').replace(/^bower_components\//, 'assets/libs/');
    }

    function sanitizeDevFilename (filename) {
        return filename.replace(/^src\//, '').replace(/^tmp\//, '../tmp/').replace(/^bower_components\//, '../bower_components/');
    }

    function isProductionMode (mode) {
        return mode === 'prod';
    }
    
    var getTemplateVariables = function () {
        return function () {
            var vars = null,
                cssCommon = [],
                cssApp = [],
                jsCommon = grunt.config('concat.common.dest'),
                jsApp = [];

            if(isProductionMode(mode)) {
                assets.common.css.forEach(function(e) {
                    cssCommon.push(sanitizeDistFilename(e));
                });

                vars = {
                    js: {
                        common: sanitizeDistFilename(jsCommon),
                        app: [sanitizeDistFilename(grunt.config('uglify.dist.dest'))]
                    },
                    css: {
                        app: ['assets/css/main.min.css'],
                        common: cssCommon
                    }
                };
            }
            else {
                assets.common.css.forEach(function(e) {
                    cssCommon.push(sanitizeDevFilename(e));
                });
                grunt.file.expand(assets.src.css).forEach(function(e) {
                    cssApp.push(sanitizeDevFilename(e));
                });

                grunt.file.expand(
                    assets.src.js
                    .concat([
                        grunt.config.process('<%= html2js.app.dest %>'),
                    ]))
                .forEach(function(e) {
                    jsApp.push(sanitizeDevFilename(e));
                });

                vars = {
                    js: {
                        common: sanitizeDevFilename(jsCommon),
                        app: jsApp
                    },
                    css: {
                        app: cssApp,
                        common: cssCommon
                    }
                };
            }
            return vars;
        }
    };


    grunt.initConfig({
        bump : {
            options : {
                files: ['package.json', 'bower.json'],
                pushTo : 'origin master',
                commitFiles: ['package.json', 'bower.json', 'dist', 'CHANGELOG.md'],
                commitMessage: 'chore: release v%VERSION%',
            }
        },
        clean : {
            files : [
                'src/index.html', 'tmp/', 'dist/'
            ]
        },
        concat : {
            common: {
                src: assets.common.js,
                dest: (isProductionMode(mode) ? 'dist' : 'tmp') + '/js/common.js'
            },
            app: {
                src: assets.src.js.concat(['<%= html2js.app.dest %>']),
                dest: 'tmp/js/App.js'
            }
        },
        concurrent: {
            target: {
                tasks: ['connect', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000
                }
            }
        },
        copy: {
            common: {
                files: [
                    { // usefull for example to put angular-locale_xx-xx.js, or bootstrap fonts
                        expand: true,
                        src: [assets.common.assets],
                        dest: (isProductionMode(mode) ? 'dist' : 'src') + '/assets/libs/',
                        rename: function(dest, src) {
                            return dest + src.replace(/^bower_components\//, '');
                        }
                    }
                ]
            },
            prod: {
                files: [
                    {expand: true, cwd: 'src/app/', src: ['**/*.html'], dest: 'tmp/app/'},
                    {expand: true, cwd: 'src/assets/', src: ['**/*.html'], dest: 'dist/assets/'},
                    {
                        expand: true,
                        src: [assets.common.css],
                        dest: 'dist/assets/libs/',
                        rename: function(dest, src) {
                            return dest + src.replace(/^bower_components\//, '');
                        }
                    },
                    {expand: true, cwd: 'src/assets/images/', src: ['**/*'], dest: 'dist/assets/images/'},
                    {expand: true, cwd: 'src/assets/i18n/', src: ['**/*'], dest: 'dist/assets/i18n/'}
                ]
            }
        },
        cssmin: {
            dist : {
                files : {
                    'dist/assets/css/main.min.css' : assets.src.css
                }
            }
        },
        html2js: {
            options: {
                base: 'tmp'
            },
            app: {
                src: ['tmp/app/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                files: [
                    {expand: true, cwd: 'dist/', src: '*.html', dest: 'dist/'},
                ]
            },
            templates: {
                files: [
                    {expand: true, cwd: 'tmp/', src: '**/*.html', dest: 'tmp/'}
                ]
            }
        },
        jshint: {
            all: assets.src.js,
            options : {
                jshintrc: '.jshintrc'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        src: [ '<%= concat.app.dest %>' ]
                    }
                ]
            }
        },
        rev: {
            dist: {
                files: {
                    src: ['dist/js/{,*/}*.js', 'dist/assets/css/{,*/}*.css']
                }
            }
        },
        template: {
            index: {
                src: 'src/index.ejs',
                dest: (isProductionMode(mode) ? 'dist' : 'src') + '/index.html',
                variables: getTemplateVariables()
            }
        },
        uglify: {
            dist: {
                src: [ '<%= concat.app.dest %>'],
                dest: 'dist/js/App.min.js'
            }
        },
        usemin: {
            html: ['dist/*.html', 'dist/**/*.html']
        },
        watch : {
            js: {
                files : ['<%= jshint.all %>'],
                tasks : ['jshint', 'template']
            },
            template: {
                files : ['<%= template.index.src %>'],
                tasks : ['template']
            }
        }
    });

    grunt.registerTask('buildDev', [
        'clean',
        'jshint',
        'html2js',
        'concat:common',
        'template'
    ]);
    
    grunt.registerTask('buildProd', [
        'clean',
        'jshint',
        'copy',
        'template',
        'htmlmin:templates',
        'html2js',
        'cssmin',
        'concat',
        'ngAnnotate',
        'uglify',
        'rev',
        'usemin',
        'htmlmin:index'
    ]);

    /*
     * --mode=prod
     * --mode=dev
     */
    grunt.registerTask('build', 'Build', function () {
        grunt.log.subhead('Build in mode ' + mode);
        switch (mode) {
        case 'dev':
            grunt.task.run('buildDev');
            break;
        case 'prod':
            grunt.task.run('buildProd');
            break;
        default:
            grunt.verbose.or.write('Incorrect build mode [' + mode + ']').error();
            grunt.fail.warn('Please retry with --mode=dev|prod');
        }
    });

    grunt.registerTask('serve', 'Dev Build', function () {
        mode = grunt.option('mode') || 'dev';
        grunt.task.run(['build', 'concurrent:target']);
    });
    
    grunt.registerTask('default', 'serve');

};

