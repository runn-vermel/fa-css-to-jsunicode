/*
 * grunt-fa
 * https://github.com/runn-vermel/fa-css-to-jsunicode
 *
 * Copyright (c) 2016 GE Digital
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run
    fa: {
      default_options: {
        options: {
        },
        files: {
          'fa_fixed.html': ['fa.css']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, run fa.
  grunt.registerTask('default', ['fa']);

};
