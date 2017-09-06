/**
 * Created by Vista on 19.10.16.
 */

angular.module('app')
    .service('stepModel', ['url', 'request', '$sessionStorage', 'user', '$localStorage', '$rootScope',
        function (url, request, $sessionStorage, user, $localStorage, $rootScope) {
            return {
                login: function (data, config, successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        if (response.data.status) {
                            $localStorage.user_id = response.data.user_id;
                            $sessionStorage.session = response.data.session;
                            if (typeof response.data.session !== 'undefined') {
                                user.isNew = false;
                            }
                            // user.isLogged = true;
                            user.user_id = response.data.user_id;
                        }
                        successCallback(response);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    request.request('POST', url.step1.login, data, config, handleSuccess, handleError)
                },
                sendCode: function (data, config, successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        if (response.data.status) {


                            if (response.data.user._city === null && response.data.user._street === null && response.data.user._house === null) {
                                response.data._isAddressEmpty = true;

                            }
                            else {
                                response.data._isAddressEmpty = false;
                            }

                            $localStorage.isLogged = true;
                            $localStorage.userSpecPromo = response.data.user.promo;
                        }
                        successCallback(response);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    data.user_id = $localStorage.user_id;
                    data.session = $sessionStorage.session;

                    request.request('POST', url.step1.sendCode, data, config, handleSuccess, handleError)
                },
                sendAddress: function (data, config, successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        successCallback(response);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    data.user_id = $localStorage.user_id;
                    request.request('POST', url.step2.sendAdress, data, config, handleSuccess, handleError)
                },
                sendOrder: function (data, config, successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        successCallback(response);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    data.user_id = $localStorage.user_id;
                    data.promo = $rootScope.promo;
                    request.request('POST', url.step3.sendOrder, data, config, handleSuccess, handleError)
                },
                socialSharing: function () {
                    var handleSuccess = function (response) {

                    };
                    var handleError = function (response) {

                    };
                    var data = {
                        id: $localStorage.user_id
                    };
                    request.request('POST', url.step3.socialSharing, data, {}, handleSuccess, handleError)
                },
                socialCheck: function (successCallback, errorCallback) {
                    var handleSuccess = function (response) {
                        successCallback(response.data.status);
                    };
                    var handleError = function (response) {
                        errorCallback(response)
                    };
                    var data = {
                        id: $localStorage.user_id
                    };
                    request.request('POST', url.step3.checkSocial, data, {}, handleSuccess, handleError)
                },
                checkPromo: function (promo, successCallback, errorCallback) {
                    var handleSuccess = function (response) {
                        successCallback(response.data);
                    };
                    var handleError = function (response) {
                        errorCallback(response)
                    };
                    var data = {
                        code: promo,
                        client_id: $localStorage.user_id
                    };
                    request.request('POST', url.step3.checkPromo, data, {}, handleSuccess, handleError)
                },
                sendFeedback: function (data, successCallback, errorCallback) {
                    var handleSuccess = function (response) {
                        successCallback(response.data);
                    };
                    var handleError = function (response) {
                        errorCallback(response)
                    };
                    data.user_id = $localStorage.user_id
                    request.request('POST', url.step3.feedBack, data, {}, handleSuccess, handleError)
                }
            }


        }]);