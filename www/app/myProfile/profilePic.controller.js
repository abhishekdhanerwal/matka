(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfilePicController', ProfilePicController);

    ProfilePicController.$inject = ['$state' , 'logger' , 'profileFactory' , '$localStorage' , '$ionicHistory', '$cordovaCamera', '$ionicLoading' , '$cordovaFileTransfer'];
    /* @ngInject */
    function ProfilePicController($state, logger, profileFactory , $localStorage , $ionicHistory, $cordovaCamera , $ionicLoading , $cordovaFileTransfer) {
        var vm = this;
        vm.progress = true;

        activate();

        function activate() {
            vm.enableReset = true;
            vm.enableSave = true;

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            vm.user = angular.copy($localStorage.__identity.user);
            if(vm.user.profilePic){
                if(vm.user.fbLogin)
                    vm.user.profilePicUrl = 'http://graph.facebook.com/'+ vm.user.profilePic +'/picture?width=270&height=270' ;
                else
                    vm.user.profilePicUrl = __env.dataServerUrl + '/user/'+ vm.user.profilePic;
            }

            console.log(vm.user)
        }

        vm.resetData = function () {
            activate();
        }

        vm.data = { "ImageURI" :  "Select Image" };
        vm.takePicture = function() {
            console.log('take picture')
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            };
            $cordovaCamera.getPicture(options).then(
                function(imageData) {
                    vm.enableReset = false;
                    vm.enableSave = false;
                    console.log(imageData)
                    vm.picData = imageData;
                    vm.ftLoad = true;

                    vm.user.profilePicUrl = imageData;
                    vm.src=imageData;
                    // vm.image = new Map();
                    // vm.image.set('fotoUp', imageData);
                    // console.log(vm.image)
                    $ionicLoading.show({template: 'Photo acquired...', duration:500});
                },
                function(err){
                    $ionicLoading.show({template: 'Click photo again...', duration:500});
                })
        }

        vm.selectPicture = function() {
            console.log('select picture')
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

            $cordovaCamera.getPicture(options).then(
                function(imageURI) {
                    vm.enableReset = false;
                    vm.enableSave = false;
                    console.log(imageURI)
                    window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                        vm.picData = fileEntry.nativeURL;
                        vm.ftLoad = true;
                        var image = document.getElementById('myImage');
                        vm.src = fileEntry.nativeURL;

                        vm.user.profilePicUrl = vm.src;

                        console.log(vm.picData)
                        console.log(image)
                        console.log(vm.src)
                    });
                    $ionicLoading.show({template: 'Photo acquired...', duration:500});
                },
                function(err){
                    $ionicLoading.show({template: 'Select photo again...', duration:500});
                })
        };

        vm.uploadPicture = function() {

            vm.enableReset = true;
            vm.enableSave = true;

            var win = function (r) {
                $ionicLoading.hide();
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
                var uploadedFile = JSON.parse(r.response)
                //         console.log(uploadedFile);
                //         // console.log("Code = " + r.responseCode);
                //         // console.log(r.response);
                //         // // console.log(r.response.file);
                //         // console.dir(r.response);
                //         // console.log(r.response.filename);
                //         // console.log("Sent = " + r.bytesSent);
                vm.user.profilePic = uploadedFile.file.filename;

                profileFactory.updateUserInfo(vm.user._id, vm.user).then(function (response) {
                    if (response.status == 200) {
                        $localStorage.__identity.user.profilPic = vm.user.profilePic;
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        logger.info('User Saved');
                        // $state.go('app.notice')
                    }
                    else if (response.status == -1) {
                        vm.enableReset = false;
                        vm.enableSave = false;
                        vm.errorMessage = 'Network Error';
                        logger.error('Network Error');
                    }
                    else if (response.status == 400) {
                        vm.enableReset = false;
                        vm.enableSave = false;
                        vm.errorMessage = response.data[0].message;
                        logger.error(response.data[0].message);
                    }
                    else if (response.status == 401) {
                        logger.info("User is not logged in. Redirecting to Login Page");
                        $state.go('auth.signout')
                    }
                    else {
                        vm.enableReset = false;
                        vm.enableSave = false;

                        logger.error('Some problem');
                    }
                });

            }

            var fail = function (error) {
                vm.enableReset = false;
                vm.enableSave = false;

                $ionicLoading.hide();
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }

            var fileURL = vm.picData;
            console.log(fileURL)
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.httpMethod = "POST";
            options.mimeType = "image/jpeg";
            options.chunkedMode = true;
            console.log(options)
            var params = {};
            params.value1 = "someparams";
            params.value2 = "otherparams";

            options.params = params;

            var ft = new FileTransfer();
            ft.onprogress = function(progressEvent) {
                vm.progressval = 0;
                if (progressEvent.lengthComputable) {
                    vm.progressval = ((progressEvent.loaded / progressEvent.total)*100).toFixed(0);
                    $ionicLoading.show({template: 'Uploading '+vm.progressval+' %'});
                    // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                } else {
                    vm.progressval++;
                    $ionicLoading.show({template: 'Uploading '+vm.progressval+' %'});
                    // loadingStatus.increment();
                }
            };
            ft.upload(fileURL, encodeURI(__env.dataServerUrl +'/user/upload'),win, fail, options , true);
        }

    }
})();