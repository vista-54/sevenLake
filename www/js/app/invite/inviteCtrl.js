/**
 * Created by Vista on 13.10.16.
 */

angular.module('app')
    .controller('inviteCtrl', ['$scope', 'user', '$state', '$cordovaSms', '$cordovaContacts', 'inviteModel', '$localStorage', '$cordovaSocialSharing',
        function ($scope, user, $state, $cordovaSms, $cordovaContacts, inviteModel, $localStorage, $cordovaSocialSharing) {
            var msg = "Я заказываю воду в 7 Озер. Получи бесплатное обновление баллона при заказе через мобильное приложение используя промо-код: " + $localStorage.userSpecPromo;
            var iosLink = 'https://itunes.apple.com/us/app/7-ozer/id1192328072?l=ru&ls=1&mt=8';
            var androinLink = 'https://play.google.com/store/apps/details?id=com.svm.sevenlakes';
            $scope.isLogged = user.isLogged;
            $scope.contacts = [];

            // $scope.$watch('contacts',function () {
            //
            // });

            // if (!$scope.isLogged) {
            //     $state.go('tabsController.login');
            // }
            // $scope.contacts = [
            //     {
            //         'name': "Artem",
            //         'phones': [
            //             '09978104745'
            //         ]
            //     }, {
            //         'name': "Brtem",
            //         'phones': [
            //             '0997810474'
            //         ]
            //     }, {
            //         'name': "Crtem",
            //         'phones': [
            //             '09978104741'
            //         ]
            //     }
            // ]

            // inviteModel.getAllContacts(function (success) {
            //     $scope.contacts = success;
            //     $scope.$apply();
            //     console.log(success);
            // }, function (error) {
            //     console.log(error);
            // });
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: '' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
                }
            };
            $scope.userPromoCode = $localStorage.userSpecPromo;
            var phonesForSmsSending = [];
            $scope.confirm = false;
            $scope.sendPromoForFriendPreload = function () {
                $scope.confirm = true;
            };

            $scope.checkContact = function (phone) {
                var elements = angular.element(document.getElementsByClassName('contact'));

                if (phonesForSmsSending.indexOf(phone) === -1) {
                    phonesForSmsSending.push(phone);
                    for (var i in elements) {
                        if (!isNaN(i)) {
                            var obj = angular.element(elements[i]);
                            if (obj.attr('data-number') === phone) {
                                obj.removeClass('ion-android-checkbox-outline-blank');
                                obj.addClass('ion-android-checkbox-outline');
                            }
                        }

                    }
                }
                else {
                    var index = phonesForSmsSending.indexOf(phone);
                    phonesForSmsSending.splice(index, 1);
                    for (var i in elements) {
                        if (!isNaN(i)) {
                            var obj = angular.element(elements[i]);
                            if (obj.attr('data-number') === phone) {
                                obj.addClass('ion-android-checkbox-outline-blank');
                                obj.removeClass('ion-android-checkbox-outline');
                            }
                        }
                    }
                }
                console.log(phonesForSmsSending);
            };
            $scope.sendSMS = function () {
                for (var i in phonesForSmsSending) {
                    var obj = phonesForSmsSending[i];
                    $cordovaSms
                        .send(obj, navigator.platform.indexOf('iP') !== -1 ? iosLink : androinLink, options)
                        .then(function () {
                            // alert('Success');
                            // Success! SMS was sent
                        }, function (error) {
                            // alert('Error');
                            // An error occurred
                        });
                }

            };
            console.log('inviteCtrl');
            $scope.share = function (sn) {
                switch (sn) {
                    case 'vk':
                        // window.plugins.socialsharing.share(msg + " " + iosLink + " " + androinLink, null /* img */, null /* url */, null, function () {
                        //     // stepModel.socialSharing();
                        // }, function (errormsg) {
                        //
                        // });
                        $cordovaSocialSharing
                            .shareVia("vkontakte", msg + " " + iosLink + " " + androinLink) // Share via native share sheet
                            .then(function (result) {
                                stepModel.socialSharing();
                                // Success!
                            }, function (err) {
                                alert('Вам необходимо скачать приложение Вконтакте');
                                // An error occured. Show a message to the user
                            });
                        break;
                    case 'wp':
                        window.plugins.socialsharing.shareViaWhatsApp(msg + " " + iosLink + " " + androinLink, null /* img */, null /* url */, function () {
                            // stepModel.socialSharing();
                        }, function (errormsg) {
                            alert('Вам необходимо скачать приложение Whatsapp');

                        });
                    // $cordovaSocialSharing
                    //     .shareVia("whatsapp", $scope.userPromoCode) // Share via native share sheet
                    //     .then(function (result) {
                    //         stepModel.socialSharing();
                    //     }, function (err) {
                    //         // An error occured. Show a message to the user
                    //     })
                }


            };
        }]);