/**
 * Created by Vista on 27.10.16.
 */


angular.module('app')
    .service('inviteModel', [function () {
        var contactSort = function (contacts) {
            var sortContactsArr = [];
            contacts.forEach(function (item, index, arr) {
                var phone_numbers = [];
                if (item.phoneNumbers !== null) {
                    item.phoneNumbers.forEach(function (phone, count, array) {
                        if (phone.type === 'mobile' && phone.value !== '' && phone.value !== null) {
                            phone_numbers.push(phone.value);
                        }
                    });
                    var contact = {
                        'name': item.displayName == null ? item.name.formatted : item.displayName,
                        'phones': phone_numbers
                    };
                    if (contact.phones.length > 0) {
                        sortContactsArr.push(contact);
                    }

                }

            });
            return sortContactsArr;

        };
        return {
            getAllContacts: function (successHandler, errorHanlder) {
                function onSuccess(contacts) {

                    var sortContacts = contactSort(contacts)
                    console.log(sortContacts)
                    successHandler(sortContacts);
                };

                function onError(contactError) {
                    alert('onError!');
                };

                var options = new ContactFindOptions();
                options.filter = "";
                options.multiple = true;
                var filter = ["displayName", "name", "addresses"];
                navigator.contacts.find(filter, onSuccess, onError, options);
            }
        }
    }]);