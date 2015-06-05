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
.factory('Types', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    getAll: function() {
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

/**
 * @ngdoc service
 * @name Products
 * @description
 * # Products
 * Service in the app.services
 */
.factory('Products', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    getAll: function(typeId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = '/products/';

      $http.get(baseUrl + 'types/' + typeId + fragmentUrl)
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

/**
 * @ngdoc service
 * @name Price
 * @description
 * # Price
 * Service in the app.services
 */
.factory('Price', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    get: function(productId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'products/';

      $http.get(baseUrl + fragmentUrl + productId + '/stockrecords')
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

/**
 * @ngdoc service
 * @name Event
 * @description
 * # Event
 * Service in the app.services
 */
.factory('Event', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    get: function() {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'events/';

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
