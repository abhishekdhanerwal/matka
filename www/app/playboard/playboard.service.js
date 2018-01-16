(function () {
    'use strict';

    angular
        .module('app.playboard')
        .factory('playboardFactory',playboardFactory);

    playboardFactory.$inject = ['$http' , '__env'];

    function playboardFactory($http , __env) {
        var service = {};

        service.generateRandomCoupon = function(id , checkpoint){
            var promise = $http.post(__env.dataServerUrl + '/token/generate/'+id +'?checkpoint='+ checkpoint)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getWinner = function(time){

            var promise = $http.get(__env.dataServerUrl + '/token/winner?time='+ time )
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
