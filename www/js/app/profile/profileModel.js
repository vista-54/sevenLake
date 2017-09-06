/**
 * Created by Vista on 21.10.16.
 */


angular.module('app')
    .service('profileModel', ['request', 'url', '$localStorage',
        function (request, url, $localStorage) {
            return {
                getUserData: function (successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        var obj = response.data.data;
                        response.data.data._address = (obj._city === null ? '' : obj._city) + ' ' + (obj._street === null ? '' : obj._street) + ' ' + (obj._house === null ? '' : obj._house) + ' ' + (obj._flat === null ? '' : obj._flat);
                        if (response.data.data._address === '   ') {
                            response.data.data._address = 'Адрес не заполнен';
                            response.data.data._isAddressEmpty = true;
                        }
                        else {
                            response.data.data._isAddressEmpty = false;
                        }
                        for (var i in response.data.history) {
                            var obj = response.data.history[i];
                            response.data.history[i].order = JSON.parse(obj.order);
                            response.data.history[i].status = obj.status === 1 ? 'Оплачен' : 'Не оплачен'
                        }
                        successCallback(response.data);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    if ($localStorage.isLogged) {
                        var data = {user_id: $localStorage.user_id};
                        request.request('GET', url.profile.getUserData, data, {}, handleSuccess, handleError)
                    }
                }
            }

        }]);