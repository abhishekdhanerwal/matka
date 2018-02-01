(function () {
    'use strict';

    angular
        .module('app.writeToUs')
        .factory('writeToUsFactory',writeToUsFactory);

    writeToUsFactory.$inject = ['$http' , '__env'];

    function writeToUsFactory($http , __env) {
        var service = {};

        service.sendMail = function(id , mail){
            var promise = $http.post(__env.dataServerUrl + '/user/support/'+id , mail)
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
