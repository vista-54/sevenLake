/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
.directive('slHeader', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'common/directives/header/header.html',
        link: function (scope, element, attrs) {
            console.log('Headerlink');
            $rootScope.$watch('title',function () {
                console.log($rootScope.title);
            })
            scope.title=$rootScope.title
        }
        // controller: 'headerCtrl'
    };
}]);