(function () {
    'use strict';

    angular
        .module('app.profile')
        .factory('profileFactory',profileFactory);

    profileFactory.$inject = ['$http' , '__env'];

    function profileFactory($http , __env) {
        var service = {};

        service.updateUser = function(user){
            var promise = $http.put(__env.dataServerUrl + '/user/update', user)
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
