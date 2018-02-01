(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('profileController', profileController);

    profileController.$inject = ['$filter' , 'logger' , 'profileFactory' , '$ionicHistory' , '$localStorage' , '$state' ];
    /* @ngInject */
    function profileController($filter, logger, profileFactory , $ionicHistory , $localStorage , $state ) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate() {
            vm.isChangePasswordSelected = false;
            vm.isProfileSelected = true;
            getUserInfo();
        }

        function getUserInfo() {
            profileFactory.getUserInfo($localStorage.__identity.user._id).then(function (response) {
                if (response.status == 200) {
                    $localStorage.__identity.user = response.data.user;
                    vm.user = response.data.user;
                    vm.dateOfBirth = $filter('date')(vm.user.dateOfBirth, 'dd-MMM-yyyy');
                    vm.progress = false;
                }
                else if (response.status == -1) {
                    vm.progress = false;
                    vm.errorMessage = 'Network Error';
                    logger.error('Network Error');
                }
                else if (response.status == 400) {
                    vm.progress = false;
                    vm.errorMessage = response.data.message;
                    logger.error(response.data.message);
                }
                else if (response.status == 401) {
                    vm.progress = false;
                    logger.info("User is not logged in.Login Again");
                    $state.go('auth.signout')
                }
                else {
                    vm.progress = false;
                    logger.error('Some problem');
                }
            })
        }

        vm.resetData = function(){
            getUserInfo();
        }

        vm.submitProfile = function(){
            vm.progress = true;
            if(vm.user.mobile.length < 9){
                vm.progress = false;
                logger.error('Mobile number is required');
            }
            else {
                profileFactory.updateUserInfo($localStorage.__identity.user._id , vm.user).then(function (response) {
                    if (response.status == 200) {
                        getUserInfo();
                        logger.info('Profile updated');
                    }
                    else if (response.status == -1) {
                        vm.progress = false;
                        vm.errorMessage = 'Network Error';
                        logger.error('Network Error');
                    }
                    else if (response.status == 400) {
                        vm.progress = false;
                        vm.errorMessage = response.data.message;
                        logger.error(response.data.message);
                    }
                    else if (response.status == 401) {
                        vm.progress = false;
                        logger.info("User is not logged in.Login Again");
                        $state.go('auth.signout')
                    }
                    else {
                        vm.progress = false;
                        logger.error('Some problem');
                    }
                })
            }
        }

        vm.submitPassword = function(){
            var password = {};
            password.password = vm.currentPassword;
            password.newPassword = vm.newPassword;
            profileFactory.updateUserPassword($localStorage.__identity.user._id , password).then(function (response) {
                if (response.status == 200) {
                    logger.info('Password changed successfully');
                    $state.go('auth.signout')
                }
                else if (response.status == -1) {
                    vm.errorMessage = 'Network Error';
                    logger.error('Network Error');
                }
                else if (response.status == 400) {
                    vm.errorMessage = response.data.message;
                    logger.error(response.data.message);
                }
                else if (response.status == 401) {
                    logger.info("User is not logged in.Login Again");
                    $state.go('auth.signout')
                }
                else {
                    logger.error('Some problem');
                }
            })
        }

        vm.changeTab = function (type) {
            if(type == 'profile'){
                vm.currentPassword = null;
                vm.newPassword = null;
                vm.password2 = null;
                vm.isChangePasswordSelected = false;
                vm.isProfileSelected = true;
            }
            else{
                vm.isChangePasswordSelected = true;
                vm.isProfileSelected = false;
            }
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();