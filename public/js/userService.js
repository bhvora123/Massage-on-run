app.service('userService', function () {
    var users = [];

    var addUser = function (newUser) {
        users = [];
        users.push(newUser);
    };

    var getUser = function () {
        return users;
    };

    return {
        addUser: addUser,
        getUser: getUser
    };

});


