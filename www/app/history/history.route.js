(function() {
    'use strict';

    angular
        .module('app.history')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.history',
                config: {
                    url: '/history',
                    templateUrl: 'app/history/history.html',
                    controller: 'HistoryController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
