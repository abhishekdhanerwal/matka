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
                    templateUrl: 'app/auth/init.html',
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
                state: 'auth.validation',
                config: {
                    url: '/validation',
                    templateUrl: 'app/auth/validation.html',
                    controller: 'ValidationController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'auth.terms',
                config: {
                    url: '/terms',
                    templateUrl: 'app/auth/terms.html',
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
