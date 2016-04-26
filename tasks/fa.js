/*
 * grunt-fa
 * https://github.com/212476604/grunt_fa
 *
 * Copyright (c) 2016 Vermel, Runn (GE Global Research)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fa', 'A plugin which converts the FA css unicode from CSS to JS.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    var codes = {};
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var filepath = f.src,
          css = grunt.file.read(filepath),
          regex;

      // \n\r\s\scontent:\s"\\f([a-zA-Z0-9]{3})"
      regex = new RegExp(/\.fa-([^:]+):before\s+{\n\s{2}content:\s"\\f([a-zA-Z0-9]{3})"/g);

      var myArr;
      while ((myArr = regex.exec(css)) !== null) {
        var name = 'fa-' + myArr[1];
        var code = 'uf' + myArr[2];
        codes[name] = code;
        grunt.log.writeln(codes[name]);
      }

      // codes = regex.exec(css);
      grunt.log.writeln(codes);

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);

      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, JSON.stringify(codes, null, 2));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
