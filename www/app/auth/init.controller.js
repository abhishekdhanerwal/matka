(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('InitController', InitController);

    InitController.$inject = ['$state' , '$window' , '$localStorage' , '$ionicHistory'];
    /* @ngInject */
    function InitController($state , $window , $localStorage , $ionicHistory) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate() {

            // $window.location.reload(true);

            // $state.reload();

            if($localStorage._identity != undefined && $localStorage._identity.principal != undefined){
                $state.go('auth.login');
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