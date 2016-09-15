module.exports = function (grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        buildConfig: {
            name: 'pumascript',
            output: 'dist/<%= buildConfig.name %>'
        },

        jshint: {
            all: [
                'gruntfile.js',
                'src/**/*.js',
                'tasks/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        clean: {
            tests: ['tmp']
        },

        qunit: {
            all: ['test/**/*.html']
        },
        // Configuration to be run (and then tested).
        puma: {
            default_options: {
                options: {},
                files: {
                    'test/grunt-test/tmp/result.js': [
                        'test/grunt-test/puma-test.js',
                        'test/grunt-test/puma-test2.js'
                    ]
                },
            }
        },

        // build pumascript
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'build/config.js',
                    out: '<%= buildConfig.output %>.js',
                    name: '<%= buildConfig.name %>',
                    optimize: 'none',
                    skipSemiColonInsertion: true,
                    paths: {
                        escodegen: 'empty:',
                        esprima: 'empty:'
                    },
                    wrap: {
                        startFile: 'build/start.js',
                        endFile: 'build/end.js'
                    },
                    onBuildWrite: function (name, path, contents) {
                        // remove define wrappers and closure ends,
                        // lines to exclude: /* exclude-build */
                        contents = contents
                            .replace(/define\([^{]*?{/, '') // define start
                            .replace(/\}\);[^}\w]*$/, '') // define end
                            .replace(/[^\n]*\/\*\s*exclude-build\s*\*\/[^\n]*/, '') // exclusions
                            .replace(/define\(\[[^\]]+\]\)[\W\n]+$/, ''); // empty definition

                        return contents;
                    }
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'requirejs', 'puma', 'qunit']);

    grunt.registerTask('travis', ['jshint', 'test']);

    grunt.registerTask('init', 'Prepare to start working with Puma', function () {
        var exec = require('child_process').exec;
        var done = this.async();

        exec('bower install', { cwd: './editor' }, function (err, stdout, stderr) {
            grunt.log.ok(stdout);
            if (err !== null) {
                grunt.log.errorlns('error: ', stderr);
            }
            done(err);
        });
    });

    grunt.registerTask('default', ['init']);
};
