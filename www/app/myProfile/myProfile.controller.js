(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('profileController', profileController);

    profileController.$inject = ['$state' , 'logger' , 'profileFactory' , '$ionicHistory' , '$localStorage' ];
    /* @ngInject */
    function profileController($state, logger, profileFactory , $ionicHistory , $localStorage ) {
        var vm = this;

        activate();

        function activate() {
            vm.isChangePasswordSelected = false;
            vm.isProfileSelected = true;
            getUserInfo();
        }

        function getUserInfo() {
            profileFactory.getUserInfo($localStorage.__identity.user._id).then(function (response) {
                console.log(response)
                vm.user = response.data.user
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

    }
})();