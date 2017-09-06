/**
 * Created by Vista on 13.10.16.
 */

angular.module('app')
    .controller('orderCtrl', ['$scope', '$rootScope', 'orderModel', '$ionicPopup', '$state', '$timeout', 'user', '$localStorage',
        function ($scope, $rootScope, orderModel, $ionicPopup, $state, $timeout, user, $localStorage) {
            var self = $scope;
            $scope.openModal = function () {
                $scope.data = {};
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    title: 'Для заказа воды у вас должна быть бутыль',
                    scope: self,
                    buttons: [
                        {
                            text: 'Добавить в корзину (' + $scope.bottle_price + ' р.)',
                            onTap: function (e) {
                                self.addOrder(self.bottle_id);
                                if ($localStorage.isLogged) {
                                    $state.go('tabsController.step3');
                                }
                                else {
                                    $state.go('tabsController.step1');
                                }

                            }
                        },
                        {
                            text: '<b>У меня есть</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if ($localStorage.isLogged) {
                                    $state.go('tabsController.step3');
                                }
                                else {
                                    $state.go('tabsController.step1');
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                });
            };

            $scope.count = 0;
            $scope.cartIsNotEmpty = false;
            $scope.$watch('count', function () {
                if ($scope.count === 0) {
                    $scope.cartIsNotEmpty = false;
                }
                else {
                    $scope.cartIsNotEmpty = true;
                }
            });
            $scope.orders = [
                {
                    "id": 1,
                    "name": "Вода питьевая",
                    "price": "130",
                    "freeCount": 0,
                    "isBottle": 0,
                    "image": "common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg"
                },
                {
                    "id": 2,
                    "name": "Баллон для воды",
                    "price": "200",
                    "freeCount": 0,
                    "isBottle": 1,
                    "image": "common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg"
                },
                {
                    "id": 3,
                    "name": "Помпа",
                    "price": "500",
                    "freeCount": 0,
                    "isBottle": 0,
                    "image": "common/img/5Dj0jde1Se68gWLqNR3q_pompa1.png"
                },
                {
                    "id": 4,
                    "name": "Кулер  Lesoto 36 TK White",
                    "price": "4050",
                    "freeCount": 0,
                    "isBottle": 0,
                    "image": "common/img/0o0hZ2cqQ4CJ0aou9iig_kuler6.png"
                },
                {
                    "id": 5,
                    "name": "Кулер  Lesoto 36 TD White",
                    "price": "5000",
                    "freeCount": 0,
                    "isBottle": 0,
                    "image": "common/img/jdrMjyRPRxedUxGj9lT5_vodorazdatchik1.jpg"
                }

            ];
            $scope.price = 0;
            var successCallback = function (success) {
                $scope.orders = success.orders;
                $scope.bottle_id = success.botle_id;
                $scope.bottle_price = success.botle_price;
                console.log(success);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            orderModel.getEntries(successCallback, errorCallback);
            self.addOrder = function (id) {
                self.entry = orderModel.addToCart(id);
                $scope.count = self.entry.cart.count;
                orderModel.addTolocalCart(self.entry.cart.orders, self.orders);
                $rootScope.count = $scope.count;
                $scope.price = self.entry.cart.price;
                console.log(self.entry);
            };
            self.removeOrder = function (id) {
                self.entry = orderModel.removeFromCart(id);
                $scope.count = self.entry.cart.count;
                orderModel.addTolocalCart(self.entry.cart.orders, self.orders);
                $rootScope.count = $scope.count;
                $scope.price = self.entry.cart.price;
                console.log(self.entry);
            };
            self.confirmOrder = function () {
                if (!self.entry.cart.bottle) {
                    $scope.openModal()
                }
                else if ($localStorage.isLogged) {
                    $state.go('tabsController.step3');
                }
                else {
                    $state.go('tabsController.step1');
                }


            };
            self.clearCart = function () {
                var successCallback = function (success, orders) {
                    $scope.orders = orders;
                    $scope.price = success.price;
                    console.log(success);
                };

                orderModel.clearCart(successCallback);
            };
            // self.clientHaveABottle=function () {
            //     // self.entry.cart.bottle=true;
            //     $state.go('tabsController.order.step1');
            // };
        }]);