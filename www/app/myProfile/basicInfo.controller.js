(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('basicInfoController', basicInfoController);

    basicInfoController.$inject = ['$state' , 'logger' , 'profileFactory' , '$ionicHistory' , '$localStorage' , '$timeout' ];
    /* @ngInject */
    function basicInfoController($state, logger, profileFactory , $ionicHistory, $localStorage , $timeout ) {
        var vm = this;

        activate();

        function activate() {
            vm.user = {};
            vm.user.name = $localStorage.__identity.user.name;
            vm.user.mobile = $localStorage.__identity.user.mobile;
            vm.user.id = $localStorage.__identity.user._id;
            vm.dailyActivityList = [
                'Less Than 30 min',
                '30 min',
                '1 hour',
                'More Than 1 hour'
            ]
        }

        vm.selectGenderType = function(gender) {
            vm.selectedGender = gender;
        }

        vm.submitUserInfo = function () {
            console.log(vm.user)
            vm.errs = [];
            if(!vm.user.name)
                vm.errs.push('Name is required');
            if(!vm.user.mobile)
                vm.errs.push('Mobile is required');
            if(!vm.user.age)
                vm.errs.push('Age is required');
            if(!vm.user.height)
                vm.errs.push('Height is required');
            if(!vm.user.weight)
                vm.errs.push('Weight is required');
            if(!vm.selectedGender)
                vm.errs.push('Gender is required');
            if(!vm.user.dailyActivity)
                vm.errs.push('Daily activity is required');

            if(vm.errs.length>0)
                logger.error(vm.errs.join(' '));
            else {
                vm.user.gender = vm.selectedGender;
                profileFactory.updateUser(vm.user).then(function (response) {
                    console.log(response);
                    if(response.status == 200){
                        $state.go('app.medicalCondition');
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