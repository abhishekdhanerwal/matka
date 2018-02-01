(function () {
    'use strict';

    angular
        .module('app.transaction')
        .controller('AddMoneyController', AddMoneyController);

    AddMoneyController.$inject = ['$localStorage' , 'logger' , 'historyFactory', '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$interval' , '$http'];
    /* @ngInject */
    function AddMoneyController($localStorage, logger , historyFactory, $ionicPopup ,Checkpoint , $ionicHistory , $scope , $interval , $http) {
        var vm = this;

        activate();

        function activate() {

        }

        // vm.share = function () {
        //     onDeviceReadyTest();
        // }



        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        vm.message = 'Everyone come and see how good I look!';
        vm.mkey = 'gtKFFx';
        vm.productInfo = 'Verification order';
        vm.txnid = makeid();
        // vm.amount = 234.99;
        vm.id = '2222222';
        vm.email = 'test@test.com';
        vm.phone = 9999999999;
        vm.lastName = 'test';
        vm.firstName = 'fname';
        vm.surl = "https://payu.herokuapp.com/success";
        vm.Furl = "https://payu.herokuapp.com/failure";
        vm.hash = '';

        vm.presubmit = function () {
            var data = { preHashString: vm.mkey + '|' + vm.txnid + '|' + vm.amount + '|' + vm.productInfo + '|' + vm.firstName + '|' + vm.email + '|' + vm.id + '||||||||||' };
            var url = 'http://localhost:8080/createHash';
            $http.post(url, data).success(function (data, status) {
                console.log(status);
                if (status == 200) {
                    document.getElementById('hash').value = data.hash;
                    document.getElementById('paymentForm').submit();
                }
            });
        }

    }
})();

