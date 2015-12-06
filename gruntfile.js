module.exports = function (grunt) {

    'use strict';

    var regex = {
        DEFINE_START: /define\([^{]*?{/,
        DEFINE_END: /\}\);[^}\w]*$/,
        EXCLUSIONS: /[^\n]*\/\*\s*exclude-build\s*\*\/[^\n]*/,
        EMPTY_DEFINITION: /define\(\[[^\]]+\]\)[\W\n]+$/
    };

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        buildName: 'pumascript',
        outputDir: 'dist',
        output: '<%= outputDir %>/<%= buildName %>',
        tests: 'test/test.js',

        jshint: {
            all: [
                'gruntfile.js',
                'src/**/*.js',
                'tasks/*.js',
                '<%= tests %>',
                '!src/libs/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        puma: {
            default_options: {
                options: {},
                files: {
                    'test/grunt-test/tmp/result.js': ['test/grunt-test/puma-test.js']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['<%= tests %>']
        },

        // build pumascript
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'build/config.js',
                    out: '<%= output %>.js',
                    name: '<%= buildName %>',
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
                            .replace(regex.DEFINE_START, '')
                            .replace(regex.DEFINE_END, '')
                            .replace(regex.EXCLUSIONS, '')
                            .replace(regex.EMPTY_DEFINITION, '');

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
    grunt.registerTask('test', ['clean', 'puma', 'nodeunit']);

    grunt.registerTask('pumascript', ['puma', 'exec:npm']);

    grunt.registerTask('default', ['jshint', 'test']);
};
