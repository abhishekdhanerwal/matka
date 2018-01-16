(function () {
    'use strict';

    angular
        .module('app.history')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['$localStorage' , 'logger' ,'historyFactory' , '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$timeout'];
    /* @ngInject */
    function HistoryController($localStorage, logger,historyFactory,  $ionicPopup ,Checkpoint , $ionicHistory , $scope , $timeout) {
        var vm = this;

        vm.progress = false;

        activate();

        function activate() {
            vm.currentDate = new Date();
            historyFactory.getUserHistory($localStorage.__identity.user._id).then(function (response) {
               vm.masterUser = response.data.user;
                _.each(vm.masterUser.history , function (value , key) {
                    value.date = new Date(value.date);
                    if(value.checkPoint == 'evening' && value.date.getDate() == vm.currentDate.getDate() && value.date.getMonth() == vm.currentDate.getMonth() && value.date.getFullYear() == vm.currentDate.getFullYear()){
                        if(vm.currentDate.getHours() < 20 && vm.currentDate.getHours() >= 13)
                            value.resultPending = true;
                        else
                            value.resultPending = false;
                    }
                    if(value.checkPoint == 'morning' && value.date.getDate() == vm.currentDate.getDate() && value.date.getMonth() == vm.currentDate.getMonth() && value.date.getFullYear() == vm.currentDate.getFullYear()){
                        if(vm.currentDate.getHours() < 13)
                            value.resultPending = true;
                        else
                            value.resultPending = false;
                    }

                });
                _.orderBy(vm.masterUser.history, ['date'],['asc']);

                vm.history = vm.masterUser.history;

                console.log(vm.history)
            })

        }

        var now = new Date();
        var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 47, 0, 0);
        if (millisTill10 < 0) {
            millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
        }
        millisTill10 = Date.parse(millisTill10);
        console.log(millisTill10)
        $timeout(function () {
            $scope.myHeader = "How are you today?";
        }, millisTill10);


        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();