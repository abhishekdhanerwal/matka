(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('ValidationController', ValidationController);

    ValidationController.$inject = ['$scope', '$state' ,'principal' , 'logger' , '$localStorage', '$ionicHistory' , 'validationHelperFactory', 'USER_ROLE' , 'ionicDatePicker' ];
    /* @ngInject */
    function ValidationController($scope, $state, principal, logger , $localStorage , $ionicHistory , validationHelperFactory , USER_ROLE , ionicDatePicker) {
        var vm = this;
        vm.user = {};
        vm.progress = false;


        vm.signup = function () {
            // var code = getCodeFromUserInput();
            console.log(vm.user.otp)
            confirmationResult.confirm(vm.user.otp.toString()).then(function (result) {
                // User signed in successfully.
                var user = result.user;
                console.log(result)
                $state.go('app.playboard')
                // ...
            }).catch(function (error) {
                console.log(error)
                vm.errMsg = 'Otp is wrong. Try Again';
                logger.error('Otp is wrong. Try Again');
                // User couldn't sign in (bad verification code?)
                // ...
            });
        };
        $ionicHistory.nextViewOptions({
            disableBack: true
        });


    }
})();