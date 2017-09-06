/**
 * Created by Vista on 19.10.16.
 */
/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
    .factory('url', ['$rootScope', function ($rootScope) {
        return {
            // server: 'http://vh44.timeweb.ru/api/web/v1/',
            // server: 'http://7ozer.creativestripe.ru/api/web/v1/',
            server: 'http://7ozerka.ru/app/api/web/v1/',
            // server: 'http://svm.biz.ua/api/web/v1/',
            // server: 'http://192.168.0.101/api/web/v1/',
            order: {
                getEntries: 'client/get-orders'
            },
            step1: {
                login: 'client/registration-by-phone-number',
                sendCode: 'client/check-code'
            },
            step2: {
                sendAdress: 'client/save-address'
            },
            step3: {
                sendOrder: 'client/save-order',
                socialSharing: 'client/social-network-sharing',
                checkSocial: 'client/social-check',
                checkPromo: 'client/check-promo-code',
                feedBack: 'client/feedback'
            },
            profile: {
                getUserData: 'client/get-user-data'
            }
        }

    }]);