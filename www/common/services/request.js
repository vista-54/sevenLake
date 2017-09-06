/**
 * Created by Vista on 19.10.16.
 */

angular.module('app')
    .service('request', ['$http', 'url', '$sessionStorage', '$ionicLoading', '$timeout', '$ionicHistory', '$ionicPopup',
        function ($http, url, $sessionStorage, $ionicLoading, $timeout, $ionicHistory, $ionicPopup) {

            var action = {
                request: function (method, action, data, config, handleSuccess, handleError, loader) {

                    var requestData = {
                        method: method,
                        action: action,
                        data: data,
                        config: config,
                        handleSuccess: handleSuccess,
                        handleError: handleError,
                        loader: loader
                    };
                    var success = function (result) {
                        handleSuccess(result);
                    };
                    var error = function (result) {
                        if (result.status === -1) {
                            // A confirm dialog
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Требуеться соединение с сетью',
                                // template: 'Требуеться соединение с сетью',
                                buttons: [
                                    {
                                        text: 'Отмена',
                                        onTap: function () {
                                            $ionicHistory.goBack();
                                        }
                                    },
                                    {
                                        text: 'Повторить',
                                        type: 'button-positive',
                                        onTap: function () {
                                            send(requestData, success, error);
                                        }
                                    }
                                ]
                            });

                            // confirmPopup.then(function (res) {
                            // if (res) {
                            //
                            // } else {
                            //     console.log('You are not sure');
                            //
                            // }
                            // });
                            // alert('Требуеться соединение с сетью');
                            // $ionicHistory.goBack();
                        }
                    };

                    function send(requestData, success, error) {
                        var getConfig, postConfig;
                        (method === "GET") ? getConfig = requestData.data : postConfig = requestData.data;
                        var req = $http({
                            method: requestData.method,
                            url: url.server + requestData.action,
                            params: getConfig,
                            data: postConfig
                        });
                        if (typeof loader === "undefined") {
                            $ionicLoading.show({
                                content: 'Loading',
                                animation: 'fade-in',
                                showBackdrop: true,
                                maxWidth: 200,
                                showDelay: 0
                            });
                        }

                        return (req.then(function (result) {
                            $timeout(function () {
                                $ionicLoading.hide();
                            }, 500);
                            success(result)
                        }, function (result) {
                            error(result);
                            $timeout(function () {
                                $ionicLoading.hide();
                            }, 500);
                        }))
                    }

                    if (navigator.onLine) {
                        send(requestData, success, error);
                    } else {
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Требуеться соединение с сетью',
                            // template: 'Требуеться соединение с сетью',
                            buttons: [
                                {
                                    text: 'Отмена',
                                    onTap: function () {
                                        $ionicHistory.goBack();
                                    }
                                },
                                {
                                    text: 'Повторить',
                                    type: 'button-positive',
                                    onTap: function () {
                                        send(requestData, success, error);
                                    }
                                }
                            ]
                        });

                    }

                }
            }
            return action;
        }]);