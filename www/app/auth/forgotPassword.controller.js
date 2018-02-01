(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('ForgotController', ForgotController);

    ForgotController.$inject = ['$state' ,'forgotFactory' ,'logger' , 'validationHelperFactory' , '$timeout'];
    /* @ngInject */
    function ForgotController( $state ,forgotFactory ,logger , validationHelperFactory , $timeout ) {
        var vm = this;
        vm.progress = false;

        vm.submit = function(){
            vm.progress = true;
            var firstError = null;
            if (vm.forgot_password_form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.forgot_password_form);
                return;
            }
            else {
                forgotFactory.forgetPwd(vm.phoneNumber).then(function (response) {

                    if (response.status == 200) {
                        vm.progress = false;
                        vm.pass = 'New Password Email Sent To Your Mail ID';
                        $timeout(function () {
                            logger.info('New password email sent to your mail id');
                            $state.go('auth.login');
                        }, 3000);
                    }
                    else if (response.status == -1) {
                        logger.set('Network Error', 'error');
                    }
                    else if (response.status == 400) {
                        logger.info(response.data[0].message);
                    }
                    else if( response.status == 401){
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('auth.signout')
                    }
                    else {
                        logger.error(response.data[0].message);
                    }
                });

            }
        }
    }
})();