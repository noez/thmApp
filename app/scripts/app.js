'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'app.core',
    'app.blocks',
    'app.services',
    'app.home',
    'app.wizard'
  ]);
