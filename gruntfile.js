// Copyright (c) 2013 - present UTN-LIS

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

        exec: {
            webpack: {
                cmd: 'node ./node_modules/webpack/bin/webpack.js --config webpack.config.js'
            }
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/pumascript.min.map',
                    sourceMapIn: 'dist/pumascript.map',
                },
                files: {
                    'dist/pumascript.min.js': [ 'dist/pumascript.js' ]
                }
            }
        },

        clean: {
            tests: ['tmp'],
            dist: ['dist']
        },

        qunit: {
            all: ['test/**/*.html']
        }
    });

    grunt.registerTask('init', 'Prepare to start working with Puma', function () {
        // Use spawn to report progress of the task
        var spawn = require('child_process').spawn;
        var cmd = spawn('bower', ['install'], { cwd: './editor' });
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

            done();
        });
    });

    grunt.registerTask('build-dev', ['clean:dist', 'exec:webpack']);

    grunt.registerTask('build', ['build-dev', 'uglify:dist']);

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'exec:webpack', 'qunit']);

    grunt.registerTask('travis', ['jshint', 'test']);

    grunt.registerTask('default', ['init']);
};
