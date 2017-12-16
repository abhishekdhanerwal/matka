(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$localStorage' , '$ionicSideMenuDelegate' , '$scope', '$state'];
  /* @ngInject */
  function sideMenuController($localStorage , $ionicSideMenuDelegate , $scope ,$state) {
    var vm = this;
  //     activate();
  //
  //   function activate() {
  //     if($localStorage._identity == undefined){
  //       $state.go('auth.login')
  //     }
  //     else
  //     vm.user = angular.copy($localStorage._identity.principal);
  //   }
  //   $scope.$watch(function () {
  //         return $ionicSideMenuDelegate.isOpenLeft();
  //       },
  //       function (isOpen) {
  //         if (isOpen){
  //           vm.user = angular.copy($localStorage._identity.principal);
  //         }
  //       });
   }

})();
