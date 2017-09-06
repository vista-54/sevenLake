// /**
//  * Created by Vista on 24.10.16.
//  */
//
//
// angular.module('app')
//     .controller('loginCtrl', ['$scope', 'stepModel', '$state', 'user', function ($scope, stepModel, $state, user) {
//         $scope.numberFieldisEmpty = true;
//         $scope.user = {};
//         $scope.isLogged = user.isLogged;
//         if ($scope.isLogged) {
//             $ionicGoBack();
//         }
//         var successCallback = function (result) {
//             $scope.numberFieldisEmpty = false;
//             console.log(result)
//         };
//         var errorCallback = function (result) {
//             console.log(result)
//         };
//
//         $scope.goToStepTwo = function (form, user) {
//             if ($scope.numberFieldisEmpty) {
//                 if (form.$valid) {
//                     if (form.$valid) {
//                         var data = {
//                             'phone': $scope.user.number
//                         };
//                         stepModel.login(data, {}, successCallback, errorCallback)
//                     }
//                 }
//             }
//             else {
//                 var data = {
//                     'code': $scope.user.code,
//                 };
//                 stepModel.sendCode(data, {}, function (success) {
//                         if (success.data.status) {
//                             user.isLogged = true;
//                             $state.go('tabsController.profile')
//
//                         }
//                         else {
//                             alert(success.data.message)
//                         }
//                     },
//                     function (error) {
//
//                     });
//             }
//         }
//     }]);