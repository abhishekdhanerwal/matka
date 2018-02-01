(function () {
    'use strict';

    angular
        .module('app.share')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['$localStorage' , 'logger' , 'historyFactory', '$ionicPopup' , 'Checkpoint' , '$ionicHistory', '$scope' ,'$interval' , '$cordovaSocialSharing' ];
    /* @ngInject */
    function ShareController($localStorage, logger , historyFactory, $ionicPopup ,Checkpoint , $ionicHistory , $scope , $interval , $cordovaSocialSharing ) {
        var vm = this;


        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        vm.options = {
            message: 'Play and Earn', // not supported on some apps (Facebook, Instagram)
            subject: 'Crack The Crock', // fi. for email
            files: ['img/init.jpg'], // an array of filenames either locally or remotely
            url: 'https://www.website.com/foo/#bar?a=b',
            chooserTitle: 'Crack The Crock' // Android only, you can override the default share sheet title
        }

        vm.onSuccess = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        vm.onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
        }


        vm.share = function () {
            console.log('click')

            window.plugins.socialsharing.shareWithOptions(vm.options, vm.onSuccess, vm.onError);
            // $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");

            // window.plugins.socialsharing.shareWithOptions(vm.options)
            //     .then(function (result) {
            //         console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            //         console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            //     }, function (err) {
            //         console.log("Sharing failed with message: " + err);
            //     });
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();