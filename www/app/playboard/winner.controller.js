(function () {
    'use strict';

    angular
        .module('app.playboard')
        .controller('WinnerController', WinnerController);

    WinnerController.$inject = ['$localStorage' , 'logger' , 'playboardFactory' , '$stateParams', '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$interval' ];
    /* @ngInject */
    function WinnerController($localStorage, logger, playboardFactory , $stateParams, $ionicPopup ,Checkpoint , $ionicHistory , $scope , $interval ) {
        var vm = this;
        vm.token = {};
        vm.progress = true;

        activate();

        function activate() {
            playboardFactory.getWinner($stateParams.time).then(function (response) {
                if (response.status == 200 || response.status == 304) {
                    vm.winnerList = response.data.data;
                    vm.progress = false;
                }
                else if (response.status == -1) {
                    vm.errorMessage = 'Network Error';
                    vm.progress = false;
                    logger.error('Network Error');
                }
                else if (response.status == 400) {
                    vm.errorMessage = response.data.message;
                    vm.progress = false;
                    logger.error(response.data.message);
                }
                else if (response.status == 401) {
                    logger.info("You are not logged in. Login Again");
                    $state.go('auth.signout')
                }
                else {
                    vm.progress = false;
                    logger.error('Some problem');
                }
            })
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();