(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('InitController', InitController);

    InitController.$inject = ['$state'  , '$localStorage' , '$ionicHistory'];
    /* @ngInject */
    function InitController($state  , $localStorage , $ionicHistory) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate() {
                if($localStorage.__identity != undefined && $localStorage.__identity.token != undefined){
                    $state.go('app.playboard');
                }
                else {
                    $state.go('auth.login');
                }
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
    }
})();