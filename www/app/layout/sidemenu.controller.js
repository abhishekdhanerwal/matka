(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('sideMenuController', sideMenuController);

  sideMenuController.$inject = ['$localStorage' , '$ionicSideMenuDelegate' , '$scope', '$state'];
  /* @ngInject */
  function sideMenuController($localStorage , $ionicSideMenuDelegate , $scope ,$state) {
    var vm = this;
      activate();

    function activate() {
      if($localStorage.__identity == undefined){
        $state.go('auth.login')
      }
      else
      vm.user = angular.copy($localStorage.__identity.user);
    }
    $scope.$watch(function () {
          return $ionicSideMenuDelegate.isOpenLeft();
        },
        function (isOpen) {
          if (isOpen){
            vm.user = angular.copy($localStorage.__identity.user);
          }
        });
   }

})();
