/**
 * Created by Vista on 13.10.16.
 */

angular.module('app.config', [])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//            uiMaskConfigProvider.allowInvalidValue = false;
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $urlRouterProvider.otherwise('/app/order');
        $stateProvider
            .state('tabsController.contact', {
                url: '/contact',
                views: {
                    'tab1': {
                        templateUrl: 'js/app/contact/contact.html',
                        controller: 'contactCtrl'
                    }
                }
            })
            .state('tabsController.order', {
                url: '/order',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/order.html',
                        controller: 'orderCtrl'
                    }
                }
            })
            .state('tabsController.step1', {
                url: '/step1',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/step1.html',
                        controller: 'step1Ctrl'
                    }
                }
            })
            .state('tabsController.login', {
                url: '/login',
                views: {
                    'tab3': {
                        templateUrl: 'js/app/profile/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('tabsController.step2', {
                url: '/step2',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/step2.html',
                        controller: 'step2Ctrl'
                    }
                }
            })
            .state('tabsController.step3', {
                url: '/step3',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/step3.html',
                        controller: 'step3Ctrl'
                    }
                }
            })
            .state('tabsController.step4', {
                url: '/step4',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/step4.html',
                        controller: 'step4Ctrl'
                    }
                }
            })
            // .state('tabsController.order.step1', {
            //     url: '/contact',
            //     templateUrl: 'js/app/order/step1.html',
            //     controller: 'step1Ctrl'
            // })
            .state('tabsController.order.step2', {
                url: '/address',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/order.html',
                        controller: 'orderCtrl'
                    }
                }
            })
            .state('tabsController.order.step3', {
                url: '/confirm',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/order/order.html',
                        controller: 'orderCtrl'
                    }
                }
            })


            .state('tabsController.profile', {
                url: '/profile',
                views: {
                    'tab3': {
                        templateUrl: 'js/app/profile/profile.html',
                        controller: 'profileCtrl'
                    }
                },

            })
            .state('tabsController.invite', {
                url: '/invite',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/invite/invite.html',
                        controller: 'inviteCtrl'
                    }
                }
            })
            .state('tabsController.contact_book', {
                url: '/contact_book',
                views: {
                    'tab2': {
                        templateUrl: 'js/app/invite/contactList.html',
                        controller: 'contactListCtrl'
                    }
                }
            })
            .state('tabsController', {
                url: '/app',
                templateUrl: 'js/app/tabs/tabs.html',
                abstract: true
            })

    });
