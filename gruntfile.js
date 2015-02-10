module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);
    
    var mode = grunt.option('mode') || 'dev';
    var destination = (mode === 'prod') ? 'dist' : 'src';

    var assets = require('./build.config');
    
    var getTemplateVariables = function () {
        return function () {
            var vars = null;
            if(mode === 'prod') {
                vars = {
                    js: {
                        common: grunt.config('uglify.common.dest'),
                        app: [grunt.config('uglify.app.dest')]
                    },
                    css: {
                        app: ['dist/assets/css/main.min.css'],
                        common: assets.common.css
                    }
                };
            }
            else {
                vars = {
                    js: {
                        common: grunt.config('concat.common.dest'),
                        app: grunt.file.expand(assets.src.js.concat(['tmp/templates.js']))
                    },
                    css: {
                        app: grunt.file.expand(assets.src.css),
                        common: assets.common.css
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
                commitFiles: ['package.json', 'bower.json', 'dist']
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
                dest: 'tmp/js/common.js'
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
                ]
            },
            prod: {
                files: [
                    {expand: true, cwd: 'src/app/', src: '**/*.html', dest: 'tmp/app/'},
                    {expand: true, cwd: 'src/assets/', src: '**/*', dest: 'dist/assets/'}
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
                src: ['tmp/**/*.html'],
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
                dest: destination + '/index.html',
                variables: getTemplateVariables()
            }
        },
        uglify: {
            common: {
                src: [ '<%= concat.common.dest %>' ],
                dest: 'dist/js/common.min.js'
            },
            app: {
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
    
    grunt.registerTask('default', 'server');

};

