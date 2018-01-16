(function () {
  'use strict';

  angular
      .module('app.auth')
      .controller('SigninController', SigninController);

  SigninController.$inject = ['$scope', '$state' ,'principal' , 'logger' , '$localStorage', 'USER_ROLE'];
  /* @ngInject */
  function SigninController($scope, $state, principal, logger , $localStorage , USER_ROLE) {
    var vm = this;

      vm.signin = signin;

      function signin() {

          principal.signin(vm.user).then(function (userInfo) {
              if(userInfo.user.role == USER_ROLE.ROLE_CONSUMER){
                  $state.go('app.playboard');
              }
              else
                  logger.error('Login from website');

          }, function () {

              logger.error("Please enter valid credentials");

          });
      }

  }
})();