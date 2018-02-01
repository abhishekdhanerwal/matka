(function () {
    'use strict';

    angular
        .module('app.history')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['$localStorage' , 'logger' ,'historyFactory' , '$ionicHistory'];
    /* @ngInject */
    function HistoryController($localStorage, logger, historyFactory , $ionicHistory ) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate() {
            vm.currentDate = new Date();
            historyFactory.getUserHistory($localStorage.__identity.user._id).then(function (response) {
                if (response.status == 200) {
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

                    vm.progress = false;
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

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();