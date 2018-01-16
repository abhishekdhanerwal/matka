(function () {
    'use strict';

    angular
        .module('app.history')
        .factory('historyFactory',historyFactory);

    historyFactory.$inject = ['$http' , '__env'];

    function historyFactory($http , __env) {
        var service = {};

        service.getUserHistory = function (id) {
            var promise = $http.get(__env.dataServerUrl + '/user/details/'+id)
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        return service;
    };
}());
