(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('profileController', profileController);

    profileController.$inject = ['$state' , 'logger' , 'profileFactory' , '$ionicHistory' ];
    /* @ngInject */
    function profileController($state, logger, profileFactory , $ionicHistory ) {
        var vm = this;

    }
})();