'use strict';
/**
* app.services Module
*
* Description
* Services throughout the entire application.
*/
angular
  .module('app.services', [])
  .constant('baseUrl', 'http://maravatio.haushaus.mx/dashboard/api/')

  /**
   * @ngdoc service
   * @name Types
   * @description
   * # Types
   * Service in the app.services
   */
  .factory('Types', ['$http', '$q','baseUrl', function($http, $q, baseUrl){
    // Public API here
    return {
      getAll: function () {
        var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'types/';

        $http.get(baseUrl + fragmentUrl)
        .success(function(data) {
          defered.resolve(data);
        })
        .error(function(err) {
          defered.reject(err);
        });

        return promise;
      }
    };
  }])
  ;
