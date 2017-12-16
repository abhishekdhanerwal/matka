(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('HealthProgramController', HealthProgramController);

    HealthProgramController.$inject = ['$scope', '$state' ,'profileFactory' , 'logger' , '$localStorage', '$ionicHistory'];
    /* @ngInject */
    function HealthProgramController($scope, $state, profileFactory, logger , $localStorage , $ionicHistory) {
        var vm = this;
        vm.user = {};

        vm.user.id = $localStorage.__identity.user._id;

        vm.personaliseApp = function (item) {
            vm.user.goal = item;
            profileFactory.updateUser(vm.user).then(function (response) {
                console.log(response);
                if(response.status == 200){
                    $state.go('app.profile');
                }
                else if (response.status == 401) {
                    vm.errorMessage = response.data.message;
                    logger.error('Login Again !! You have been logged out');
                    console.error(response);
                    $timeout(function () {
                        $state.go('auth.signout')
                    }, 2000);
                }
                else {
                    vm.errorMessage = 'Some problem';
                    toaster.error('Some problem', 'error');
                    console.error(response);
                }
            })
        }
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();