/**
 * Created by Vista on 21.10.16.
 */



angular.module('app')
    .factory('user', [function () {
        return {
            id:null,
            phone:null,
            city:null,
            street:null,
            house:null,
            flat:null,
            isLogged:false,
            isNew:true
        }
    }]);