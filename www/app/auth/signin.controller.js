(function () {
  'use strict';

  angular
      .module('app.auth')
      .controller('SigninController', SigninController);

  SigninController.$inject = ['$ionicLoading', '$state' ,'principal' , 'logger' , '$http', 'USER_ROLE' , 'ngFB'];
  /* @ngInject */
  function SigninController($ionicLoading, $state, principal, logger , $http , USER_ROLE , ngFB) {
    var vm = this;

      vm.progress = false;

      $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=26.4251756,75.0394445&key=AIzaSyAQumIttwb7x9JokwYSVj0BBwtXTqkWhvk').then(function (response) {
          console.log(response)
      })

      vm.signin = signin;

      function signin() {

          $ionicLoading.show({
              template: '<div class="spinner"><ion-spinner icon="lines" class="spinner-royal"></ion-spinner></div>'
          });

          principal.signin(vm.user).then(function (userInfo) {
              if(userInfo.user.role == USER_ROLE.ROLE_CONSUMER){
                  $state.go('app.playboard');
              }
              else {
                  $ionicLoading.hide();
                  logger.error('Login from website');
              }

          }, function () {
              $ionicLoading.hide();
              logger.error("Please enter valid credentials");

          });
      }


      vm.fbLogin = function () {

          vm.progress = true;

          ngFB.login({scope: 'email,user_location'}).then(
              function (response) {
                  if (response.status === 'connected') {
                      console.log('Facebook login succeeded');
                      logger.info('Facebook login succeeded');
                      console.log(response);
                      ngFB.api({
                          path: '/me',
                          params: {fields: 'id,name,email,age_range'}
                      }).then(
                          function (user) {
                              console.log(user)
                              var newUser = {};
                              newUser.name = user.name;
                              newUser.email = user.email;
                              newUser.profilePic = user.id;
                              newUser.role = USER_ROLE.ROLE_CONSUMER;
                              newUser.dateOfBirth = new Date( (new Date().getFullYear() - user.age_range.min) ,0,1);

                              // onSuccess Callback
                              // This method accepts a Position object, which contains the
                              // current GPS coordinates
                              //
                              // var onSuccess = function(position) {
                              //     console.log(position)
                              //     console.log('Latitude: '          + position.coords.latitude          + '\n' +
                              //         'Longitude: '         + position.coords.longitude         + '\n' +
                              //         'Altitude: '          + position.coords.altitude          + '\n' +
                              //         'Accuracy: '          + position.coords.accuracy          + '\n' +
                              //         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                              //         'Heading: '           + position.coords.heading           + '\n' +
                              //         'Speed: '             + position.coords.speed             + '\n' +
                              //         'Timestamp: '         + position.timestamp                + '\n');
                              // };
                              //
                              // // onError Callback receives a PositionError object
                              // //
                              // function onError(error) {
                              //     alert('code: '    + error.code    + '\n' +
                              //         'message: ' + error.message + '\n');
                              // }
                              //
                              // navigator.geolocation.getCurrentPosition(onSuccess, onError);

                              principal.signinFb(newUser).then(function (userInfo) {
                                  $state.go('app.playboard');
                              }, function () {
                                  logger.error("Please enter valid credentials");
                              });
                              // vm.fbuser = user;
                              //
                          },
                          function (error) {
                              // alert('Facebook error: ' + error.error_description);
                              vm.progress = false;
                              logger.error('Facebook error: ' + error.error_description);
                          });
                  } else {
                      // alert('Facebook login failed');
                      vm.progress = false;
                      logger.error('Facebook login failed');
                  }
              });
      }
  }
})();