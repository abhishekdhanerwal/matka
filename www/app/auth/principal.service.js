(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('principal', principal);

  principal.$inject = ['$q', '$http', 'authFactory', 'logger', '$localStorage' , '$rootScope' , '$state'];

  /* @ngInject */
  function principal($q, $http, authFactory, logger, $localStorage , $rootScope ,$state) {

    var tokenExpire ;

    var service = {
      signup:signup,
      signin: signin,
      signinFb:signinFb,
      signout: signout
    };
    return service;


    function isIdentityInLocalStorage() {
      return angular.isDefined($localStorage.__identity);
    }

    function clearLocalStorage() {
      if (isIdentityInLocalStorage()) {
        $localStorage.$reset();
        $localStorage.tokenExpire = tokenExpire;
      }
    }

    function signup(user) {
      var deferred = $q.defer();

      $http.post(__env.dataServerUrl+'/register', user)
          .then(
              function (response) {
                if (response.status == 200) {
                    enterApplication(deferred.resolve , response);
                }
                else {
                  clearLocalStorage();
                  deferred.reject("Invalid Login credentials");
                }
              },
              function (errors) {
                clearLocalStorage();
                logger.error(errors.data.message);
                deferred.reject("Error connecting server " + errors);
              });
      return deferred.promise;

    }

    function signinFb(user) {
      var deferred = $q.defer();

      $http.post(__env.dataServerUrl+'/login/fb', user)
          .then(
              function (response) {
                if (response.status == 200) {
                    enterApplication(deferred.resolve , response);
                }
                else {
                  clearLocalStorage();
                  deferred.reject("Invalid Login credentials");
                }
              },
              function (errors) {
                clearLocalStorage();
                deferred.reject("Error connecting server " + errors);
              });
      return deferred.promise;
    }

    function signin(user) {
      var deferred = $q.defer();

      $http.post(__env.dataServerUrl+'/login', user)
          .then(
              function (response) {
                if (response.status == 200) {
                    enterApplication(deferred.resolve , response);
                }
                else {
                  clearLocalStorage();
                  deferred.reject("Invalid Login credentials");
                }
              },
              function (errors) {
                clearLocalStorage();
                deferred.reject("Error connecting server " + errors);
              });
      return deferred.promise;
    }

    function enterApplication(callback , response) {
        $localStorage.loggedInTimeStamp = Date.now();
        authFactory.setUserToken(response.data.token , response.data.user)
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;
        // deferred.resolve($localStorage.__identity);
        callback($localStorage.__identity);
    }

    function signout() {
      tokenExpire = $localStorage.tokenExpire;
      clearLocalStorage();
      $http.defaults.headers.common['Authorization'] = '';
      return true;
    }
  }

})();


