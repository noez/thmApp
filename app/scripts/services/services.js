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
  .constant('token', 'Token 61e7de5eae825fe98dbb8e1ad714a97d4fc090f8')
  //local constants
  .constant('baseUrlLocal', 'http://192.168.1.14:8000/dashboard/api/')
  .constant('tokenLocal', 'Token c4e913f4877e6762b8458b4d349ed402a5c3a842')
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
    },
    getById : function(typeId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'types/';

      $http.get(baseUrl + fragmentUrl + typeId)
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
    },
    getById : function(productId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'products/';

      $http.get(baseUrl + fragmentUrl + productId)
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

/**
 * @ngdoc service
 * @name Template
 * @description
 * # Template
 * Service in the app.services
 */
.factory('Template', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
  // Public API here
  return {
    get: function(eventId) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = '/templates/';

      $http.get(baseUrl + 'events/' + eventId + fragmentUrl)
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
 * @name UploadImage
 * @description
 * # UploadImage
 * Service in the app.services
 */
.factory('UploadImage', ['$http', '$q', 'baseUrlLocal','tokenLocal', function($http, $q, baseUrlLocal, tokenLocal) {
  // Public API here
  return {
    file: function(fd) {
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'uploadimages/';

      $http
        .post(baseUrlLocal + fragmentUrl, fd, {
          headers: {
            'Content-Type': undefined,
            'Authorization': tokenLocal
          },
          transformRequest: angular.identify
        })
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
 * @name UploadLabel
 * @description
 * # UploadLabel
 * Service in the app.services
 */

.factory('UploadLabel', ['$http', '$q','baseUrlLocal', 'tokenLocal', function($http, $q, baseUrlLocal, tokenLocal){
  return {
    send : function (data) {
      console.log('sevice says ' + typeof data);
      var defered = $q.defer(),
        promise = defered.promise,
        fragmentUrl = 'labels/';

      $http
        .post(baseUrlLocal + fragmentUrl, data , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenLocal
          }
          //transformRequest: angular.identify
        })
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
 * @name Matriz
 * @description
 * # Matriz
 * Service in the app.services
 */
.factory('Matriz', [function(){
  return{
    transform : {}
  };
}])

/**
 * @ngdoc service
 * @name Matriz
 * @description
 * # Matriz
 * Service in the app.services
 */
.factory('Oscar', ['$http',  '$q', function($http,  $q){
  $http.defaults.withCredentials = true;
  return {
    send : function (url, data) {
      console.log('sevice says ' + typeof data);
      var defered = $q.defer(),
        promise = defered.promise;

      $http
        .post(url, data , {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie' : 'csrftoken=InJJliexGwdAyB1X5ZQwC32KNWLF20JE'
          },
          transformRequest: angular.identify
        })
        .success(function(data) {
          defered.resolve(data);
        })
        .error(function(err) {
          defered.reject(err);
        });
      console.log($http.defaults);
      return promise;
    }
  };
}])
;
