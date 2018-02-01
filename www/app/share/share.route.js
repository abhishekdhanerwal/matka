(function() {
    'use strict';

    angular
        .module('app.share')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.share',
                config: {
                    url: '/share',
                    templateUrl: 'app/share/share.html',
                    controller: 'ShareController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
