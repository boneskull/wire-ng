/**
 *
 * @module wire-ng
 */

'use strict';

var _ = require('lodash-node'),
  path = require('path'),
  fs = require('fs'),
  format = require('util').format,
  find = require('globule').find,
  ast = require('esprima-ast-utils'),

  wire = function wire(dirs, srcs, opts) {
    var files;

    if (_.isEmpty(dirs)) {
      throw new Error('expected one or more directories to inspect');
    }
    if (_.isEmpty(srcs)) {
      throw new Error('expected one or more source files to modify');
    }
    if (!_.isArray(srcs)) {
      srcs = [srcs];
    }
    if (!_.isArray(dirs)) {
      dirs = [dirs];
    }
    opts = opts || {};

    files = _(dirs)
      .map(_.partialRight(findFiles, opts))
      .flatten()
      .value();

  return files;
  },

  findFiles = function findFiles(filepath, opts) {
    var join, normalize, exclude, file_pattern, pattern;

    if (!filepath) {
      throw new Error('findFiles expects a filepath parameter');
    }

    opts = opts || {};
    join = path.join;
    normalize = path.normalize;
    exclude = opts.exclude ? normalize(opts.exclude) : null;
    file_pattern = join.apply(null, opts.recursive ? ['**', '*.js'] : ['*.js']);

    filepath = normalize(filepath);
    pattern = [join(normalize(filepath), file_pattern)];
    if (exclude) {
      pattern.push(['!' + exclude]);
    }

    return find(pattern, {
      cwd: opts.cwd || process.cwd()
    });
  };

wire.findFiles = findFiles;

module.exports = wire;
