(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$state' ,'principal' , 'logger' , '$localStorage', '$ionicHistory' , 'validationHelperFactory', 'USER_ROLE' , 'ionicDatePicker' ];
    /* @ngInject */
    function SignupController($scope, $state, principal, logger , $localStorage , $ionicHistory , validationHelperFactory , USER_ROLE , ionicDatePicker) {
        var vm = this;
        vm.user = {};

        vm.dietitian = false;

        vm.signup = function () {
            console.log(vm.Form.$invalid)
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                vm.user.password = 'secret';
                vm.user.role = USER_ROLE.ROLE_CONSUMER;
                console.log(vm.user)
                principal.signup(vm.user).then(function (response) {
                    // vm.progress = false;
                    console.log(response)
                    $state.go('app.playboard');
                    logger.info('Profile created', 'default');

                });

            }
        };
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    vm.user.dateOfBirth = new Date(val).getDate() +'-' +new Date(val).getMonth()+1 + '-'+ new Date(val).getFullYear();
                },
                // disabledDates: [            //Optional
                //     new Date(2016, 2, 16),
                //     new Date(2015, 3, 16),
                //     new Date(2015, 4, 16),
                //     new Date(2015, 5, 16),
                //     new Date('Wednesday, August 12, 2015'),
                //     new Date("08-16-2016"),
                //     new Date(1439676000000)
                // ],
                from: new Date(1950, 1, 1), //Optional
                to: new Date(), //Optional
                inputDate: new Date(),      //Optional
                mondayFirst: true,          //Optional
                // disableWeekdays: [0],       //Optional
                closeOnSelect: false,       //Optional
                templateType: 'popup'       //Optional
            };

            vm.openDatePicker = function(){
                ionicDatePicker.openDatePicker(ipObj1);
            };

    }
})();