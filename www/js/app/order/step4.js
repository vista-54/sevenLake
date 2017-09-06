/**
 * Created by Vista on 18.10.16.
 */

angular.module('app')
    .controller('step4Ctrl', ['$scope', 'entry', '$rootScope', 'stepModel',
        function ($scope, entry, $rootScope, stepModel) {
            $scope.orders = entry.cart.orders;
            $rootScope.count = 0;
            console.log('finishpage');
            $scope.activatePromo = function (user) {
                if (typeof user !== 'undefined') {
                    stepModel.checkPromo(user.promo, function (response) {
                        if (response.status) {
                            alert('Поздравляем!Вы получили бесплатное обновление бутыли.');
                        }
                        else {
                            alert('Промокод не действительный');
                        }
                        console.log(response);
                    }, function (error) {
                        console.log(error)
                    })
                }
            }
        }]);