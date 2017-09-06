/**
 * Created by Vista on 13.10.16.
 */

angular.module('app')
    .controller('profileCtrl', ['$scope', '$rootScope', 'profileModel', 'stepModel', 'user', '$state', '$localStorage',
        function ($scope, $rootScope, profileModel, stepModel, user, $state, $localStorage) {
            $scope.user = {};
            $scope.numberFieldisEmpty = true;
            $rootScope.isLogged = $localStorage.isLogged;
            if ($rootScope.isLogged) {
                profileModel.getUserData(function (result) {
                        $scope.user = result.data;
                        $scope.history = result.history;
                        $rootScope._isAddressEmpty = result.data._isAddressEmpty;
                    },
                    function (result) {
                        console.log(result)
                    });
            }
            $rootScope.$watch('isLogged', function () {
                    if ($rootScope.isLogged) {
                        profileModel.getUserData(function (result) {
                                $scope.user = result.data;
                                $scope.history = result.history;
                                $rootScope._isAddressEmpty = result.data._isAddressEmpty;
                            },
                            function (result) {
                                console.log(result)
                            });
                    }
                }
            );

            $rootScope.editAddressAllow = false;
            $scope.editPhone = function () {
                $rootScope.isLogged = false;
            };
            $scope.editAddress = function () {
                $rootScope.editAddressAllow = true;
            };
            // $scope.goToStepTwo = function (form, user) {
            //     if ($scope.numberFieldisEmpty) {
            //         if (form.$valid) {
            //             if (form.$valid) {
            //                 var data = {
            //                     'phone': $scope.user.number
            //                 };
            //                 stepModel.login(data, {}, function (result) {
            //                     $scope.numberFieldisEmpty = false;
            //                     console.log(result)
            //                 }, function (result) {
            //                     console.log(result)
            //                 })
            //             }
            //         }
            //     }
            //     else {
            //         var data = {
            //             'code': $scope.user.code,
            //         };
            //         stepModel.sendCode(data, {}, function (success) {
            //                 if (success.data.status) {
            //                     user.isLogged = true;
            //                     $scope.isLogged = true;
            //                     // $state.go('tabsController.profile')
            //                     profileModel.getUserData(function (result) {
            //                             $scope.user = result.data;
            //                         },
            //                         function (result) {
            //                             console.log(result)
            //                         });
            //                 }
            //                 else {
            //                     alert(success.data.message)
            //                 }
            //             },
            //             function (error) {
            //
            //             });
            //     }
            // }

            // if ($scope.isLogged) {
            //     profileModel.getUserData(successCallback, errorCallback);
            //     console.log('profileCtrl');
            // }
            // else {
            //     $state.go('tabsController.login');
            // }

        }]);