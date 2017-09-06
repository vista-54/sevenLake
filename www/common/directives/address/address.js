/**
 * Created by Vista on 30.10.16.
 */


/**
 * Created by Vista on 26.10.16.
 */


angular.module('app')
    .directive('address', [function () {
        return {
            restrict: 'AE',
            link: function () {
                console.log('address init');
            },
            templateUrl: 'common/directives/address/address.html',
            controller: 'addressCtrl'
        }

    }]);

