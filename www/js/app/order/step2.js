/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
    .controller('step2Ctrl', ['$scope', '$state', 'stepModel', '$cordovaGeolocation', '$ionicLoading', '$timeout',
        function ($scope, $state, stepModel, $cordovaGeolocation, $ionicLoading, $timeout) {
            $scope.user = {};
            $scope.goToStepThree = function (form, user) {
                if (form.$valid) {
                    stepModel.sendAddress($scope.user, {}, function (sucess) {
                        console.log(sucess);
                    }, function (error) {
                        console.log(error);
                    });
                    $state.go('tabsController.step3')
                }


            };
            $scope.getCurrentPosition = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
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
            }
        }]);