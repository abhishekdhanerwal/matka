(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('medicalConditionController', medicalConditionController);

    medicalConditionController.$inject = ['$scope', '$state' ,'profileFactory' , 'logger' , '$localStorage', '$ionicHistory'];
    /* @ngInject */
    function medicalConditionController($scope, $state, profileFactory, logger , $localStorage , $ionicHistory) {
        var vm = this;
        vm.medical = {};

        vm.medical.id = $localStorage.__identity.user._id;

        vm.submitUserInfo = function () {
            console.log(vm.medical)
            vm.errs = [];
            if(!vm.medical.medicalCondition)
                vm.errs.push('Select disease presence');
            if(vm.medical.medicalCondition == 'Yes' && !vm.medical.disease)
                vm.errs.push('Select disease type');
            if(vm.medical.disease == 'Other' && !vm.medical.other)
                vm.errs.push('Mention the disease you are suffering from');

            if(vm.errs.length>0)
                logger.error(vm.errs.join(' '));
            else {
                if(vm.medical.disease == 'Other')
                    vm.medical.disease = vm.medical.other;
                if(vm.medical.medicalCondition == 'Yes')
                    vm.medical.medicalCondition = true;
                else
                    vm.medical.medicalCondition = false;

                profileFactory.updateUser(vm.medical).then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        $state.go('app.healthProgram');
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
        }
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();