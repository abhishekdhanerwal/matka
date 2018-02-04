(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/myProfile/myProfile.html',
                    controller: 'profileController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.userImage',
                config: {
                    url: '/userImage',
                    templateUrl: 'app/myProfile/profilePic.html',
                    controller: 'ProfilePicController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
