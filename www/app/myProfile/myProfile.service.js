(function () {
    'use strict';

    angular
        .module('app.profile')
        .factory('profileFactory',profileFactory);

    profileFactory.$inject = ['$http' , '__env'];

    function profileFactory($http , __env) {
        var service = {};

        service.getUserInfo = function(id){
            var promise = $http.get(__env.dataServerUrl +'/user/details/'+id)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.updateUserInfo = function(id, user){
            var promise = $http.put(__env.dataServerUrl +'/user/updateDetails/'+id , user)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.updateUserPassword = function(id, user){
            var promise = $http.put(__env.dataServerUrl +'/user/updatePassword/'+id , user)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        return service;
    };
}());
