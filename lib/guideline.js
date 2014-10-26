'use strict';

var type = require('type-of'),
  defaults = require('defaults'),
  assert = require('assert'),

  typeMap,
  identity,
  each,
  values,
  guide;

identity = function identity(value) {
  return value;
};

values = function values(collection) {
  var key, items = [];
  for (key in collection) {
    if (collection.hasOwnProperty(key)) {
      items.push(collection[key]);
    }
  }
  return items;
};
values.$guidelines = [
  'container'
];

each = function each(collection, fn, ctx) {
  var key;
  if (type(collection) === 'array') {
    return collection.forEach(fn, ctx);
  }
  if (type(collection) === 'object' || type(collection) === 'function') {
    for (key in collection) {
      if (collection.hasOwnProperty(key)) {
        fn.call(ctx, collection[key], key);
      }
    }
  }
  return collection;
};
each.$guidelines = [
  {},
  {
    type: 'function',
    'default': identity
  },
  {
    type: ['container', 'none'],
    'default': null
  }
];


guide = function guide(value) {
  var valueMap = typeMap({
    'function': function(value) {
      return [value];
    },
    'array': function(value) {
      return value.filter(function(item) {
        return type(item) === 'function';
      });
    },
    'object': function(value) {

    }
  });


},


typeMap = function typeMap(object) {
    return function(value) {
      if (object[type(value)]) {
        return object[type(value)].call(null, value);
      }
      if (object['default']) {
        return object.default.call(null, value);
      }
      return value;
    };
};
typeMap.$guidelines = [
  {
    type: 'object',
    'default': {
      'default': identity
    }
  }
];
