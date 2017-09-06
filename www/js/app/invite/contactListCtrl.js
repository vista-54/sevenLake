/**
 * Created by Vista on 25.11.16.
 */
/**
 * Created by Vista on 13.10.16.
 */

angular.module('app')
    .controller('contactListCtrl', ['$scope', 'user', '$state', '$cordovaSms', '$cordovaContacts', 'inviteModel', '$localStorage',
        function ($scope, user, $state, $cordovaSms, $cordovaContacts, inviteModel, $localStorage) {
            var msg = "Я заказываю воду в 7 Озер. Получи бесплатное обновление баллона при заказе через мобильное приложение используя промо-код: " + $localStorage.userSpecPromo +
                ' ios: https://itunes.apple.com/us/app/7-ozer/id1192328072?l=ru&ls=1&mt=8' +
                ' android: https://play.google.com/store/apps/details?id=com.svm.sevenlakes';
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

            inviteModel.getAllContacts(function (success) {
                $scope.contacts = success;
                $scope.$apply();
                console.log(success);
            }, function (error) {
                console.log(error);
            });
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
                // for (var i in phonesForSmsSending) {
                //     var obj = phonesForSmsSending[i];
                $cordovaSms
                    .send(phonesForSmsSending, msg, options)
                    .then(function () {
                        // alert('Success');
                        // Success! SMS was sent
                    }, function (error) {
                        // alert('Error');
                        // An error occurred
                    });
                // }

            };
            console.log('inviteCtrl');
        }]);