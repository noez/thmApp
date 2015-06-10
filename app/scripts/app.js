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
    'app.wizard',
    'app.home'
  ])
  .run(['$cookies', function($cookies){
    $cookies.put('csrftoken','04Hf9gX4VJVzAKMvIzpd6noFdO4Wszgp');
  }]);
