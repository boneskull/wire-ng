#!/usr/bin/env node

'use strict';

var path = require('path'),
  pkg = require(path.normalize(path.join(__dirname, '..', 'package.json'))),
  yargs = require('yargs'),
  wire = require('../index'),
  _ = require('lodash-node'),
  argv = yargs
    .options({
      dir: {
        require: true,
        alias: 'd',
        describe: 'Directory to search for AngularJS code.',
        requiresArg: true,
        string: true
      },
      src: {
        require: true,
        alias: 's',
        describe: 'Source file(s) to modify'
      },
      recursive: {
        boolean: true,
        alias: 'R',
        describe: 'Inspect directories recursively',
        'default': true
      },
      config: {
        config: true,
        alias: 'c',
        describe: 'Config file to use'
      },
      exclude: {
        string: true,
        requiresArg: true,
        describe: 'Path to ignore',
        alias: 'e'
      }
    })
    .strict()
    .help('help')
    .version(pkg.version, 'version')
    .showHelpOnFail(true)
    .usage('Usage: $0 --dir directory --src source_file [--dir directory --src source_file...]')
    .argv;

wire(argv.dir, argv.src, _.pick(argv, ['recursive', 'exclude']));
