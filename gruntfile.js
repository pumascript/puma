/*
 * puma-script
 *
 * Copyright (c) 2014 UTN-LIS
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    puma_script_grunt: {
      default_options: {
        options: {
        },
        files: {
          'tmp/result.js': ['test/fixtures/puma.js']
        }
      }      
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'puma_script_grunt', 'nodeunit']);

  grunt.registerTask('puma', ['clean', 'puma_script_grunt']);
  
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};