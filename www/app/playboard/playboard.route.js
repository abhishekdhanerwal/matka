(function() {
    'use strict';

    angular
        .module('app.playboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.playboard',
                config: {
                    url: '/playboard',
                    templateUrl: 'app/playboard/playboard.html',
                    controller: 'PlayboardController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
