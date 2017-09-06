/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
    .directive('rating', ['$rootScope',function ($rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'common/directives/rating/rating.html',
            link: function (scope, element, attrs) {
                console.log('rating link init');
                // element.onclick(function () {
                //     console.log('click');
                // })
            },
            controller: 'ratingCtrl'
        };
    }]);