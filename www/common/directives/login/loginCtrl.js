/**
 * Created by Vista on 24.10.16.
 */


angular.module('app')
    .controller('loginCtrl', ['$scope', 'stepModel', '$state', 'user', '$rootScope', '$localStorage',
        function ($scope, stepModel, $state, user, $rootScope, $localStorage) {
            $scope.numberFieldisEmpty = true;
            $scope.user = {};
            $rootScope.isLogged = $localStorage.isLogged;

            $scope.goToStepTwo = function (form) {
                if ($scope.numberFieldisEmpty) {
                    if (form.$valid) {
                        if (form.$valid) {
                            var data = {
                                'phone':'+7'+ $scope.user.number
                            };
                            stepModel.login(data, {}, function (result) {
                                $scope.numberFieldisEmpty = false;
                                console.log(result)
                            }, function (result) {
                                console.log(result)
                            })
                        }
                    }
                }
                else {
                    var data = {
                        'code': $scope.user.code,
                    };
                    stepModel.sendCode(data, {}, function (success) {
                            if (success.data.status) {
                                user.isLogged = true;
                                $rootScope.isLogged = true;
                            }
                            else {
                                navigator.notification.alert(
                                    'Вы ввели не верный код! Пожалуйста, попробуйте еще раз',  // message
                                    function () {
                                        $state.reload();
                                    },         // callback
                                    '',            // title
                                    'ОК'                  // buttonName
                                );
                                // alert('Вы ввели не верный код! Пожалуйста, попробуйте еще раз')
                            }
                        },
                        function (error) {

                        });
                }
            }
        }]);