'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  path = require('path'),
  expect = chai.expect;

chai.use(require('sinon-chai'));

describe('wire-ng', function () {

  var wire, sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create('wire-ng');
    wire = require(path.normalize('..', 'index'));
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('wire()', function () {

    beforeEach(function () {
      sandbox.stub(wire, 'findFiles').onFirstCall().returns('foo').onSecondCall().returns(['bar']);
    });

    it('should be a function', function () {
      expect(wire).to.be.a('function');
    });

    it('should throw if no dirs passed', function () {
      expect(wire).to.throw();
    });

    it('should throw if no srcs passed', function () {
      expect(function() {
        wire([]);
      }).to.throw();
    });

    it('should accept multiple dirs', function () {

    });


  });

  describe('wire.findFiles()', function () {
    it('should be a function', function () {
      expect(wire.findFiles).to.be.a('function');
    });

    it('should throw if not passed filepath', function () {
      expect(wire.findFiles).to.throw();
    });

    it('should return array of all js files in current dir', function () {
      expect(wire.findFiles(__dirname)).to.eql([__filename]);
    });

    it('should return array of all js files from project root, recursively, excluding' +
    ' those in node_modules', function () {
      var output = wire.findFiles('.', {
        exclude: 'node_modules/**/*.js',
        recursive: true
      });
      expect(output).to.eql([
        'bin/wire-ng.js',
        'index.js',
        'test/wire-ng.spec.js'
      ]);
    });


  });


});
