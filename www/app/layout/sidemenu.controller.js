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
            if(vm.user.profilePic) {
              if (vm.user.fbLogin)
                vm.user.profilePic = 'http://graph.facebook.com/' + vm.user.profilePic + '/picture?width=270&height=270';
              else
                vm.user.profilePic = __env.dataServerUrl + '/user/' + vm.user.profilePic;
            }
            console.log(vm.user)
          }
        });
   }

})();
