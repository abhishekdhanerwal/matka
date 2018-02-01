// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'app.auth',
    'app.logger',
    'app.router',
    'app.layout',
    'app.playboard',
    'app.history',
    'app.profile',
    'app.share',
    'app.writeToUs',
    'app.transaction',
    'ionic-datepicker',
    'ionic',
    'nl2br',
    'ngCordova',
    'ngOpenFB',
    'monospaced.elastic',
    'ngAnimate'])

    .config(['$httpProvider', function($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    }])

    .run(function($ionicPlatform,$rootScope,$http, $ionicConfig, $timeout, $ionicPopup, $ionicHistory, $state, $location, ConnectivityMonitor, $localStorage, $cordovaGoogleAnalytics , ngFB) {
        $rootScope.currentUser = null;
        $rootScope.currentState = null;
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState=angular.fromJson(toState.pageType);

            if (toState.$$finishAuthorize) {
                return;
            }

            ConnectivityMonitor.startWatching();

        });


        if($localStorage.__identity != undefined && $localStorage.__identity.token)
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;


        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            ngFB.init({appId: '139283340210743'});

            // Enable to debug issues.
            // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            var notificationOpenedCallback = function(jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                $state.go('app.playboard');
            };

            window.plugins.OneSignal
                .startInit("2d4b5211-c0c3-4c99-b3d9-30393f62545e")
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();

            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);

            // https://github.com/danwilson/google-analytics-plugin#javascript-usage
            // $cordovaGoogleAnalytics.debugMode();

            // start tracker
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/

            $cordovaGoogleAnalytics.startTrackerWithId('UA-112668050-1');

            // set user id
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id

            // $cordovaGoogleAnalytics.setUserId('USER_ID');

            // track a view
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/screens
            // Hint: Currently no support for appName, appId, appVersion, appInstallerId
            //       If you need support for it, please create an issue on github:
            //       https://github.com/driftyco/ng-cordova/issues

            // $cordovaGoogleAnalytics.trackView('Home Screen');

            // set custom dimensions
            // https://developers.google.com/analytics/devguides/platform/customdimsmets

            // $cordovaGoogleAnalytics.addCustomDimension('dimension1', 'Level 1');

            // track event
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/events

            // $cordovaGoogleAnalytics.trackEvent('Videos', 'Video Load Time', 'Gone With the Wind', 100);

            // add transaction
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addTrans

            // $cordovaGoogleAnalytics.addTransaction('1234', 'Acme Clothing', '11.99', '5', '1.29', 'EUR');

            // add transaction item
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addItem

            // $cordovaGoogleAnalytics.addTransactionItem(
            //     '1234', 'Fluffy Pink Bunnies', 'DD23444', 'Party Toys', '11.99', '1', 'GBP'
            // );

            // allow IDFA collection to enable demographics and interest reports
            // https://developers.google.com/analytics/devguides/collection/ios/v3/optional-features#idfa

            // $cordovaGoogleAnalytics.setAllowIDFACollection(true);
        });

        $ionicPlatform.registerBackButtonAction(function(e) {
            e.preventDefault();
            function showConfirm() {
                var confirmPopup = $ionicPopup.show({
                    title : 'Exit Crack The Crock?',
                    template : 'Are you sure you want to exit CrackTheCrock?',
                    buttons : [{
                        text : 'Cancel',
                        type : ' button-assertive'
                    }, {
                        text : 'OK',
                        type : 'button-positive',
                        onTap : function() {
                            ionic.Platform.exitApp();
                        }
                    }]
                });
            };

            // Is there a page to go back to?
            if ($ionicHistory.backView()) {
                // Go back in history
                console.log('can Go Back '+$location.path());
                $ionicHistory.backView().go();
            } else {
                // This is the last page: Show confirmation popup
                console.log('pa '+$location.path());
                if ($location.path() === "/app/playboard" || $location.path() === "/auth/login") {
                    showConfirm();
                } else {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.playboard');
                }

            }

            return false;
        }, 101);
    });
