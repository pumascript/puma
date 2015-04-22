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
    puma: {
      default_options: {
        options: {
        },
        files: {
          'test/grunt-test/tmp/result.js': ['test/grunt-test/puma-test.js']
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
  grunt.registerTask('test', ['clean', 'puma', 'nodeunit']);

  grunt.registerTask('pumascript', ['puma', 'exec:npm']);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};