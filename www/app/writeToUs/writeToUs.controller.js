(function () {
    'use strict';

    angular
        .module('app.writeToUs')
        .controller('WriteToUsController', WriteToUsController);

    WriteToUsController.$inject = ['$localStorage' , 'logger' , 'writeToUsFactory', '$ionicPopup' ,  '$ionicHistory', '$scope'  ];
    /* @ngInject */
    function WriteToUsController($localStorage, logger , writeToUsFactory, $ionicPopup , $ionicHistory , $scope  ) {
        var vm = this;

        vm.progress = false;

        activate();

        function activate() {

        }
        vm.submit = function(){
            vm.progress = true;
            writeToUsFactory.sendMail($localStorage.__identity.user._id , vm.mail).then(function (response) {
                if (response.status == 200) {
                    vm.mail = null;
                    vm.progress = false;
                    var myPopup = $ionicPopup.show({
                        template: '<div class="text-center">You Will Get A Reply Soon On Your Mail Id From Our Team</div>',
                        title: 'Mail Sent',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>OK</b>',
                                type: 'button-balanced',
                                onTap: function(e) {
                                    return true;
                                }
                            },
                        ]
                    });
                }
                else if (response.status == -1) {
                    vm.progress = false;
                    vm.errorMessage = 'Network Error';
                    logger.error('Network Error');
                }
                else if (response.status == 400) {
                    vm.progress = false;
                    vm.errorMessage = response.data.message;
                    logger.error(response.data.message);
                }
                else if (response.status == 401) {
                    vm.progress = false;
                    logger.info("User is not logged in.Login Again");
                    $state.go('auth.signout')
                }
                else {
                    vm.progress = false;
                    logger.error('Some problem');
                }
            })
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();