/**
 * Created by Vista on 15.10.16.
 */


angular.module('app')
    .controller('step3Ctrl', ['$scope', '$state', 'entry', 'stepModel', '$cordovaSocialSharing', 'orderModel', '$rootScope', '$ionicNavBarDelegate',
        function ($scope, $state, entry, stepModel, $cordovaSocialSharing, orderModel, $rootScope, $ionicNavBarDelegate) {
            // var msg = "Я заказываю воду в 7 Озер. Получи бесплатное обновление баллона при заказе через мобильное приложение используя промо-код: SOC7"
            $scope.socialHidden = true;
            $scope.feedback = {};
            $ionicNavBarDelegate.showBackButton(false);
            // stepModel.socialCheck(function (response) {
            //     if (response !== null) {
            //         if (response.status === 1) {
            //             $scope.socialHidden = true;
            //         }
            //         else {
            //             $scope.socialHidden = false;
            //         }
            //     }
            //     else {
            //         $scope.socialHidden = false;
            //     }
            //
            // }, function (response) {
            //     console.log(error)
            // });

            $scope.share = function (sn) {
                switch (sn) {
                    case 'vk':
                        $cordovaSocialSharing
                            .shareVia("vkontakte", msg) // Share via native share sheet
                            .then(function (result) {
                                stepModel.socialSharing();
                                // Success!
                            }, function (err) {
                                alert('Вам необходимо скачать приложение Вконтакте');
                                // An error occured. Show a message to the user
                            });
                        break;
                    case 'fb':
                        $cordovaSocialSharing
                            .shareVia("facebook", msg) // Share via native share sheet
                            .then(function (result) {
                                stepModel.socialSharing();
                            }, function (err) {
                                alert('Вам необходимо скачать приложение Facebook');
                                // An error occured. Show a message to the user
                            })
                }


            };
            $scope.orders = delEmtyPositions(entry.cart.orders);
            function delEmtyPositions(data) {
                var res = [];
                for (var i in data) {
                    if (data[i].count !== 0) {
                        res.push(data[i])
                    }

                }
                return res;
            }

            $scope.goToStepFour = function (user) {
                // if (typeof user !== 'undefined') {
                //     stepModel.checkPromo(user.promo, function (response) {
                //         if (response.status) {
                //             alert('Поздравляем!Вы получили бесплатное обновление бутыли.');
                //         }
                //         else {
                //             alert('Промокод не действительный');
                //         }
                //         console.log(response);
                //     }, function (error) {
                //         console.log(error)
                //     })
                // }


            };
            stepModel.sendOrder({
                order: $scope.orders
            }, {}, function (success) {
                if (success.data.status) {
                    console.log(success);
                    entry.cart.orders = [];
                    entry.cart.bottle = false;
                    entry.cart.count = 0;
                    entry.cart.price = 0;
                    $rootScope.count = 0;
                    // orderModel.clearCart(function (e) {
                    //
                    // });
                    // $state.go('tabsController.step4')

                }
                else {
                    alert(success.data.message);
                }

            }, function (error) {

            });
            $scope.activatePromo = function (user) {
                if (typeof user !== 'undefined') {
                    stepModel.checkPromo(user.promo, function (response) {
                        if (response.status) {
                            alert('Поздравляем!Вы получили бесплатное обновление бутыли.');
                        }
                        else {
                            alert('Промокод не действительный');
                        }
                        console.log(response);
                    }, function (error) {
                        console.log(error)
                    })
                }
            };
            var feedBackSuccess = function (result) {
                console.log(result);
                if (result) {
                    alert('Спаисбо за вашу оценку');
                    $scope.feedback = "";
                }
            };
            var feedBackError = function (result) {
                console.log(result);
            };
            $scope.feedbackIsShow = false;
            $scope.sendFeedback = function () {
                if ($scope.feedbackIsShow) {
                    if (feedbackForm.length > 0) {

                        // }
                        // if (feedbackForm.$modelValue.length > 0) {
                        console.log(feedbackForm.$modelValue + $rootScope.rating);
                        var data = {
                            msg: feedbackForm.feedback.value,
                            rate: $rootScope.rating,

                        };
                        stepModel.sendFeedback(data, feedBackSuccess, feedBackError)
                        // }
                    }
                }
                else {
                    $scope.feedbackIsShow = true
                }

            }
        }]);