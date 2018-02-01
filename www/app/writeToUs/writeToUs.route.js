(function() {
    'use strict';

    angular
        .module('app.writeToUs')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.writeToUs',
                config: {
                    url: '/writeToUs',
                    templateUrl: 'app/writeToUs/writeToUs.html',
                    controller: 'WriteToUsController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
