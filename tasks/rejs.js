/*
 * grunt-rejs
 * https://github.com/Moncader/grunt-rejs
 *
 * Copyright (c) 2014 Jason Parrott
 * Licensed under the ZLib license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var rejs = require('rejs');

  function log(pString) {
    grunt.log.writeln(pString);
  }

  grunt.registerMultiTask('rejs', 'Grunt support for ReJS', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var tOptions = this.options({
      punctuation: '.',
      separator: ', ',
      log: log
    });

    var tResolver = new rejs.Resolver(tOptions);
    var tFiles = this.files;
    var tFileSet;
    var tFile;
    var tBlobs;
    var i, il, j, jl;
    var tSortedFiles;
    var tSource;

    for (i = 0, il = tFiles.length; i < il; i++) {
      tFileSet = tFiles[i].src;
      tBlobs = {};

      for (j = 0, jl = tFileSet.length; j < jl; j++) {
        tFile = tFileSet[j];

        if (grunt.file.exists(tFile)) {
          tBlobs[tFile] = grunt.file.read(tFile);
        }
      }

      tSortedFiles = tResolver.resolve(tBlobs);
      tSource = '';

      for (j = 0, jl = tSortedFiles.length; j < jl; j++) {
        tSource += tBlobs[tSortedFiles[j]] + '\n';
      }

      grunt.file.write(tFiles[i].dest, tSource);

      grunt.log.writeln('File "' + tFiles[i].dest + '" created.');
    }
  });

};
