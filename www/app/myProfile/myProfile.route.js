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
                state: 'app.basicInfo',
                config: {
                    url: '/basicInfo',
                    templateUrl: 'app/myProfile/basicInfo.html',
                    controller: 'basicInfoController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.medicalCondition',
                config: {
                    url: '/medicalCondition',
                    templateUrl: 'app/myProfile/medicalCondition.html',
                    controller: 'medicalConditionController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.healthProgram',
                config: {
                    url: '/healthProgram',
                    templateUrl: 'app/myProfile/healthProgram.html',
                    controller: 'HealthProgramController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/myProfile/myProfile.html',
                    controller: 'profileController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
