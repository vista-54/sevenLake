/**
 * Created by Vista on 15.10.16.
 */

angular.module('app')
    .service('orderModel', ['entry', 'request', 'url', '$rootScope', '$localStorage',
        function (entry, request, url, $rootScope, $localStorage) {
            var searchOrderInOrders = function (id) {
                for (var i in model.orders) {
                    var obj = model.orders[i];
                    if (obj.id === id)

                        return obj;
                }
            };
            var searchBottleInOrders = function (orders) {
                for (var i in orders) {
                    var obj = orders[i];
                    if (obj.isBottle == 1) {
                        return obj;
                    }
                }
            };
            var model = {
                freeCounts: 0,
                addToCart: function (id) {

                    var newElement = searchOrderInOrders(id);
                    var price = parseFloat(newElement.price);
                    if (newElement.freeCount > model.freeCounts) {
                        price = 0;
                        model.freeCounts++;
                    }
                    var isChanged = false;
                    //check this element in cart

                    entry.cart.orders.forEach(function (item, i, arr) {
                        if (item.id === id) {
                            isChanged = true;
                            item.count++;

                            item.price += parseFloat(newElement.price);


                        }
                    });
                    if (!isChanged) {

                        var order = {
                            id: newElement.id,
                            price: price,
                            count: 1,
                            name: newElement.name
                        };

                        if (newElement.isBottle === 1) {
                            entry.cart.bottle = true;

                        }
                        entry.cart.orders.push(order);
                    }
                    entry.cart.count++;

                    entry.cart.price += price;


                    console.log('cart: ' + JSON.stringify(entry.cart))
                    return entry;
                },
                removeFromCart: function (id) {
                    var newElement = searchOrderInOrders(id);
                    entry.cart.orders.forEach(function (item, i, arr) {

                        if (item.id === id && item.count > 0) {
                            item.count--;
                            if (item.price !== 0) {
                                item.price -= parseFloat(newElement.price);
                                entry.cart.price -= parseFloat(newElement.price);
                            }
                            entry.cart.count--;


                            if (item.count === 0) {
                                if (newElement.isBottle === 1) {
                                    entry.cart.bottle = false;

                                }
                                model.freeCounts=0;
                                // entry.cart.orders.splice(i, 1);
                            }

                        }
                    });

                    return entry;
                },
                getEntries: function (successCallback, errorCallback) {
                    handleSuccess = function (response) {
                        model.orders = response.data.data;
                        $rootScope.promo = response.data.promo;
                        console.log($rootScope.promo);
                        for (var i in model.orders) {
                            model.orders[i].inCartCount = 0;
                            if (model.orders[i].name.indexOf('Вода') !== -1) {
                                model.orders[i].volume = "18,9 л ";
                            }
                        }
                        var bottle = searchBottleInOrders(model.orders);
                        model.botle_id = bottle.id;
                        model.botle_price = bottle.price;
                        successCallback(model);
                    };
                    handleError = function (response) {
                        errorCallback(response);
                    };
                    if ($localStorage.isLogged) {
                        var data = {
                            user_id: $localStorage.user_id
                        }
                    }
                    else {
                        var data = {}
                    }
                    request.request('GET', url.order.getEntries, data, {}, handleSuccess, handleError,true);
                    //return entry.waters;
                },
                addTolocalCart: function (cart, orders) {
                    for (var i in orders) {
                        var objOrder = orders[i];
                        for (var j in cart) {
                            var cartObj = cart[j];
                            if (objOrder.id == cartObj.id) {
                                orders[i].inCartCount = cartObj.count;
                            }

                        }
                    }
                    return orders;
                }
                ,
                orders: [],
                clearCart: function (successHandler) {
                    entry.cart.orders = [];
                    entry.cart.price = 0;
                    entry.cart.bottle = false;
                    entry.cart.count = 0;
                    $rootScope.count = 0;
                    for (var i in model.orders) {
                        model.orders[i].inCartCount = 0;
                    }
                    successHandler(entry.cart, model.orders);
                }

            };
            return model;
        }]);