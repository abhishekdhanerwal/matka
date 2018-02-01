(function() {
    'use strict';

    angular
        .module('app.transaction')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.transaction',
                config: {
                    url: '/transaction',
                    templateUrl: 'app/transaction/transaction.html',
                    controller: 'TransactionController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.addMoney',
                config: {
                    url: '/addMoney',
                    templateUrl: 'app/transaction/addMoney.html',
                    controller: 'AddMoneyController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.paytm',
                config: {
                    url: '/paytm',
                    templateUrl: 'app/transaction/paytm.html',
                    controller: 'TransactionController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
