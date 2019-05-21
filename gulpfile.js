'use strict';

// Load Gulp and tools we will use.
const gulp          = require('gulp'),
      fs            = require('fs'),
      deepmerge     = require('deepmerge'),
      { tasks }     = require('@zivtech/starterlight-tasks');

// Load configuration.
global.SLoptions = fs.existsSync('./config.json')
  ? deepmerge(require('./config.default.json'), require('./config.json'))
  : require('./config.default.json');

// Load tasks
for(let task in tasks) {
  exports[task] = tasks[task];
}
