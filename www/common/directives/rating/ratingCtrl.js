/**
 * Created by Vista on 08.12.16.
 */


angular.module('app')
    .controller('ratingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.clickOnStar = function (int) {
            console.log(int);
            $rootScope.rating=int;
        }
    }]);