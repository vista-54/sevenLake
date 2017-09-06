/**
 * Created by Vista on 30.10.16.
 */



angular.module('app')
    .controller('addressCtrl', ['$scope', '$state', 'stepModel', '$rootScope', '$cordovaGeolocation', '$ionicLoading', '$timeout',
        function ($scope, $state, stepModel, $rootScope, $cordovaGeolocation, $ionicLoading, $timeout) {
            $scope.user = {};
            $scope.saveAddress = function (form, user) {
                if (form.$valid) {
                    stepModel.sendAddress($scope.user, {}, function (success) {
                        console.log(success);
                        if (success) {
                            $rootScope.editAddressAllow = false;
                        }
                    }, function (error) {
                        console.log(error);
                    });

                }
            };
            $scope.getCurrentPosition = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 1000
                });
                var posOptions = {timeout: 2000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat = position.coords.latitude
                        var long = position.coords.longitude
                        var geocoder = new google.maps.Geocoder;
                        var latlng = {lat: lat, lng: long};
                        geocoder.geocode({'location': latlng}, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {

                                $scope.user._city = results[0].address_components[3].short_name;
                                $scope.user._street = results[0].address_components[1].short_name;
                                $scope.user._house = results[0].address_components[0].short_name;
                                $timeout(function () {
                                    $ionicLoading.hide();
                                }, 500);
                                if (results[1]) {

                                    console.log(results[1].formatted_address);
                                } else {
                                    alert('Не удалось найти ваше местоположение');
                                }
                            } else {
                                $timeout(function () {
                                    $ionicLoading.hide();
                                }, 500);
                                alert('Не удалось найти ваше местоположение!Включите обнаружение местоположения на вашем устройстве!');
                            }
                        });

                    }, function (err) {
                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 500);
                        alert('Не удалось найти ваше местоположение!Включите обнаружение местоположения на вашем устройстве!');

                    });
            };
            $timeout(function () {
                $scope.getCurrentPosition();
            }, 1500);

        }]);