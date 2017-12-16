(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'startAction',
                config: {
                    url: '',
                    template: '<div class="spinner" ng-show="vm.progress"><ion-spinner icon="android"></ion-spinner></div>',
                    controller: 'InitController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'auth',
                config: {
                    abstract: true,
                    url: '/auth',
                    templateUrl: 'app/auth/auth.html'
                }
            },
            {
                state: 'auth.signup',
                config: {
                    url: '/signup',
                    templateUrl: 'app/auth/signUp.html',
                    controller: 'SignupController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'auth.dietitian',
                config: {
                    url: '/dietitian',
                    templateUrl: 'app/auth/signUp.html',
                    controller: 'DietitianController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'auth.redirectDietitian',
                config: {
                    url: '/redirectDietitian',
                    templateUrl: 'app/auth/redirectDietitian.html'
                }
            },
            {
                state: 'auth.login',
                config: {
                    url: '/login',
                    templateUrl: 'app/auth/login.html',
                    controller: 'SigninController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'auth.signout',
                config: {
                    url: '/signout',
                    controller: 'SignoutController'
                }
            },
            {
                state: 'auth.forgot',
                config: {
                    url: '/forgot',
                    templateUrl: 'app/auth/login_forgot.html',
                    controller: 'ForgotController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app',
                config: {
                    url: '/app',
                    templateUrl: 'app/layout/sidebar.html',
                    controller: 'sideMenuController',
                    controllerAs: 'vm'
                }
            }


        ];
    }
})();
