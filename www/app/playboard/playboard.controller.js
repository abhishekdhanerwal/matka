(function () {
    'use strict';

    angular
        .module('app.playboard')
        .controller('PlayboardController', PlayboardController);

    PlayboardController.$inject = ['$localStorage' , 'logger' , 'playboardFactory' , 'historyFactory', '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$interval' ];
    /* @ngInject */
    function PlayboardController($localStorage, logger, playboardFactory , historyFactory, $ionicPopup ,Checkpoint , $ionicHistory , $scope , $interval ) {
        var vm = this;
        vm.token = {};
        vm.progress = false;
        vm.showTimer = true;
        vm.showTimerNextDay = true;

        activate();

        function activate() {
            vm.currentDate = new Date();
            vm.checkPointMorning = new Date();
            vm.checkPointEvening = new Date();
            vm.morningDraw = new Date();
            vm.eveningDraw = new Date();
            vm.checkPointMorning.setHours(12);
            vm.checkPointEvening.setHours(19);
            vm.morningDraw.setHours(13);
            vm.eveningDraw.setHours(20);
            vm.checkPointMorning.setMinutes(0);
            vm.checkPointEvening.setMinutes(0);
            vm.morningDraw.setMinutes(0);
            vm.eveningDraw.setMinutes(0);
            vm.checkPointMorning.setSeconds(0);
            vm.checkPointEvening.setSeconds(0);
            vm.morningDraw.setSeconds(0);
            vm.eveningDraw.setSeconds(0);
            vm.checkPointMorning.setMilliseconds(0);
            vm.checkPointEvening.setMilliseconds(0);
            vm.morningDraw.setMilliseconds(0);
            vm.eveningDraw.setMilliseconds(0);
            historyFactory.getUserHistory($localStorage.__identity.user._id).then(function (response) {
                vm.masterUser = response.data.user;
                _.each(vm.masterUser.history , function (value , key) {
                    value.date = new Date(value.date);
                    if(vm.currentDate.getDate() == value.date.getDate() && vm.currentDate.getMonth() == value.date.getMonth() && vm.currentDate.getFullYear() == value.date.getFullYear())
                        vm.token = value;
                });
                console.log(vm.token)
            })

            playboardFactory.getWinner('evening').then(function (response) {
                console.log(response)
            })

            if($localStorage.tokenExpire == undefined || ($localStorage.tokenExpire != 13 && $localStorage.tokenExpire != 20) )
                $localStorage.tokenExpire = new Date().getHours() - 1;

            if($localStorage.tokenExpire == 20 && new Date().getHours() < 20)
                $localStorage.tokenExpire = new Date().getHours() - 1;

            vm.tokenExpire = $localStorage.tokenExpire;

        }
        
        function showResult() {
            
        }

        $interval(function () {
            vm.showTimer = true;
            vm.showTimerNextDay = true;
            if(vm.morningDraw - new Date() > 0){
                if(vm.checkPointMorning - new Date() > 0) {
                    vm.timeRemaining = vm.checkPointMorning.getHours() - new Date().getHours() - 1 + ' : ' + (59 - new Date().getMinutes()) + ' : ' + (60 - new Date().getSeconds());
                }
                else
                    vm.showTimer = false;
            }
            else {
                if(vm.eveningDraw - new Date() > 0){
                    if (vm.checkPointEvening - new Date() > 0) {
                        vm.timeRemaining = vm.checkPointEvening.getHours() - new Date().getHours() - 1 + ' : ' + (59 - new Date().getMinutes()) + ' : ' + (60 - new Date().getSeconds());
                    }
                    else {
                        vm.showTimer = false;
                        vm.showTimerNextDay = true;
                    }
                }
                else {
                    vm.showTimer = false;
                    vm.showTimerNextDay = false;
                }
            }
        }, 1000);

        vm.play = function () {
            if($localStorage.__identity.user.points < 25){
                var myPopupOne = $ionicPopup.show({
                    template: 'You have less points buy them',
                    title: 'ALERT',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>OK</b>',
                            type: 'button-balanced',
                            onTap: function(e) {
                                return true;
                            }
                        },
                    ]
                });
            }
            else {
                if(vm.currentDate.getHours() < 12)
                    var tempCheckpoint = Checkpoint.CheckPoint_Morning;
                else
                    var tempCheckpoint = Checkpoint.CheckPoint_Evening;

                var myPopup = $ionicPopup.show({
                    template: '<div class="text-center">2 + 3 = 5</div>',
                    title: 'CONFIRM',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'No',
                            type: 'button-assertive',
                            onTap: function(e) {
                                logger.error('Your answer was incorrect');
                                return false;
                            }
                        },
                        {
                            text: '<b>Yes</b>',
                            type: 'button-balanced',
                            onTap: function(e) {
                                return true;
                            }
                        },
                    ]
                });
                myPopup.then(function(res) {
                    if(res){
                        playboardFactory.generateRandomCoupon($localStorage.__identity.user._id , tempCheckpoint).then(function (response) {
                            console.log(response)
                            if (response.status == 200) {
                                vm.token = {};
                                $localStorage.__identity.user = response.data.data.user;
                                vm.token.token = response.data.data.token;
                                if(tempCheckpoint == Checkpoint.CheckPoint_Morning){
                                    $localStorage.tokenExpire = 13;
                                    vm.tokenExpire = $localStorage.tokenExpire;
                                }
                                else {
                                    $localStorage.tokenExpire = 20;
                                    vm.tokenExpire = $localStorage.tokenExpire;
                                }
                                logger.info('Token Generated');
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
                                logger.info("User is not logged in. Login Again");
                                $state.go('auth.signout')
                            }
                            else {
                                logger.error('Some problem');
                            }
                        })
                    }
                });
            }
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();