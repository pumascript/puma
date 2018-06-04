// Copyright (c) 2013 - present UTN-LIS

/* eslint global-require: 0 */

module.exports = function (grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);


    // Project configuration.
    grunt.initConfig({
        buildConfig: {
            name: 'pumascript',
            output: 'dist/<%= buildConfig.name %>'
        },

        eslint: {
            options: {
                configFile: '.eslintrc.js',
                format: 'stylish'
            },
            target: [
                './editor/*.js',
                './src/**/*.js',
                './test/**/*.js'
            ]
        },

        exec: {
            webpack: {
                cmd: 'node ./node_modules/webpack/bin/webpack.js --config webpack.config.js'
            },
            qunit:{
                cmd: 'node ./node_modules/node-qunit-phantomjs/bin/node-qunit-phantomjs test/test.html'
            },
            ci:{
                cmd: 'node ./node_modules/node-qunit-phantomjs/bin/node-qunit-phantomjs test/test.html --verbose'
            }
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/pumascript.min.map',
                    sourceMapIn: 'dist/pumascript.map'
                },
                files: {
                    'dist/pumascript.min.js': [ 'dist/pumascript.js' ]
                }
            }
        },

        clean: {
            tests: ['tmp'],
            dist: ['dist']
        }

    });

    grunt.registerTask('init', 'Prepare to start working with Puma', function () {
        // Use spawn to report progress of the task
        var exec = require('child_process').exec;
        var cmd = exec('npm install', { cwd: './editor' });
        var done = this.async();

        cmd.stdout.on('data', function (data) {
            grunt.log.write(data.toString());
        });

        cmd.stderr.on('data', function (data) {
            grunt.log.error('Error: ' + data.toString());
        });

        cmd.on('exit', function (code) {
            if (code > 0) {
                grunt.fail.fatal('Process Finished Code: ' + code.toString());
            } else {
                grunt.log.ok('Process Finished Code: ' + code.toString());
            }

            //Grunt init tasks ends with an "Done, with errors" message due
            //to the forecoming sentence
            done();
        });
    });

    grunt.registerTask('build-dev', ['clean:dist', 'exec:webpack']);

    grunt.registerTask('build', ['build-dev', 'uglify:dist']);

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'exec:webpack', 'exec:qunit']);

    grunt.registerTask('test-ci', ['clean', 'exec:webpack', 'exec:ci']);

    grunt.registerTask('travis', ['eslint', 'test-ci']);

    grunt.registerTask('default', ['init']);
};
