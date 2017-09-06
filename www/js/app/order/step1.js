/**
 * Created by Vista on 15.10.16.
 */
angular.module('app')
    .controller('step1Ctrl', ['$scope', '$state', 'stepModel', 'user', '$rootScope',
        function ($scope, $state, stepModel, user, $rootScope) {
            console.log('step1 init');
            $scope.numberFieldisEmpty = true;
            $scope.user = {};

            var successCallback = function (result) {
                if (typeof result.data.session === 'undefined') {
                    $state.go('tabsController.step2');
                }
                else {
                    $scope.numberFieldisEmpty = false;

                }
                console.log(result)
            };
            var errorCallback = function (result) {
                console.log(result)
            };

            $scope.goToStepTwo = function (form, user) {
                if ($scope.numberFieldisEmpty) {
                    if (form.$valid) {
                        var data = {
                            'phone': '+7'+$scope.user.number
                        };
                        stepModel.login(data, {}, successCallback, errorCallback)
                    }
                }
                else {
                    var data = {
                        'code': $scope.user.code
                    };
                    stepModel.sendCode(data, {}, function (success) {
                            if (success.data.status) {
                                $rootScope._isAddressEmpty = success.data._isAddressEmpty;
                                if ($rootScope._isAddressEmpty) {
                                    $state.go('tabsController.step2');
                                }
                                else {
                                    $state.go('tabsController.step3')
                                }


                            }
                            else {
                                alert('Вы ввели не верный код! Пожалуйста, попробуйте еще раз');
                            }
                        },
                        function (error) {

                        });

                }

            }
        }])
;