/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
.factory('entry', ['$rootScope',function ($rootScope) {
    var entry = {};

    entry.cart={
        orders:[],
        count:0,
        price:0,
        bottle:false
    };
    $rootScope.count=entry.cart.count;

    //entry.waters=[
    //    {id:1,price:200,name:'тестовая вода1',volume:'20',image:'common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg'},
    //    {id:2,price:250,name:'тестовая вода2',volume:'20',image:'common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg'},
    //    {id:3,price:300,name:'тестовая вода3',volume:'20',image:'common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg'},
    //    {id:4,price:350,name:'тестовая вода4',volume:'20',image:'common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg'},
    //    {id:5,price:400,name:'Баллон для воды',volume:'20',image:'common/img/7fklneEaRAOSOcdo7XkX_bottle1_3.jpg'},
    //    {id:6,price:450,name:'Помпа DOLPHIN',volume:'20',image:'common/img/5Dj0jde1Se68gWLqNR3q_pompa1.png'},
    //    {id:7,price:500,name:'Кулер Aqua Work 36',volume:'20',image:'common/img/0o0hZ2cqQ4CJ0aou9iig_kuler6.png'},
    //    {id:8,price:550,name:'Кулер Aqнua Work 16',volume:'20',image:'common/img/jdrMjyRPRxedUxGj9lT5_vodorazdatchik1.jpg'},
    //];
    return entry;

}]);