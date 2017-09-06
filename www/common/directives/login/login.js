/**
 * Created by Vista on 26.10.16.
 */


angular.module('app')
    .directive('login', [function () {
        return {
            restrict: 'AE',
            link: function () {
                console.log('login init');
            },
            templateUrl: 'common/directives/login/login.html',
            controller: 'loginCtrl'
        }

    }]);

