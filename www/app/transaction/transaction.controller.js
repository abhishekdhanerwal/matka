(function () {
    'use strict';

    angular
        .module('app.transaction')
        .controller('TransactionController', TransactionController);

    TransactionController.$inject = ['$localStorage' , 'logger' , 'historyFactory', '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$interval' , '$http'];
    /* @ngInject */
    function TransactionController($localStorage, logger , historyFactory, $ionicPopup ,Checkpoint , $ionicHistory , $scope , $interval , $http) {
        var vm = this;

        activate();

        function activate() {

        }

    }
})();

