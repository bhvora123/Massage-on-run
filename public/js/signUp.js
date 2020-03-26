app.controller("SignUpCtrl", function ($scope, $http, userService) {


    /////////////////////////////////////////////////////////////////////////////////////////////////

/*    $scope.newUser = [];
    $scope.newUser.firstName = "";
    $scope.newUser.lastName = "";
    $scope.newUser.password = "";
    $scope.newUser.gender = "";
    $scope.newUser.address = "";
    $scope.newUser.email = "";
    
*/
    /*Signup click*/
    $scope.signUp = function (newUser) {

//        $scope.newUser = newUser;

 //       console.log(newUser)

        /* Validation */
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;


//        if(newUser == "") alert("wah chaacha");

        if ($scope.newUser.firstName == null || $scope.newUser.firstName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide First Name";
            return;
        } else if ($scope.newUser.lastName == null || $scope.newUser.lastName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide Last Name";
            return;
        } else if ($scope.newUser.password == "" || $scope.newUser.password == null || $scope.newUser.password.length < 6) {
            $scope.fail = true;
            $scope.failMessage = "Password must be atleast 6 characters long";
            return;
        } else if ($scope.newUser.password != $scope.newUser.rePassword) {
            $scope.fail = true;
            $scope.failMessage = "Passwords must match";
            return;
        } else if ($scope.newUser.gender == "" || $scope.newUser.gender == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid gender";
            return;
        } else if ($scope.newUser.address == "" || $scope.newUser.address == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid Address";
            return;
        } else if ($scope.newUser.email == null || $scope.newUser.email == "" || !emailFilter.test($scope.newUser.email) || $scope.newUser.email.match(illegalChars)) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid email address";
            return;
        }

        $scope.fail = false;

        $http.post('/api/customer', newUser)
               .success(function (res) {
                   $scope.customer = res;
                   console.log($scope.customer)
        })
    }

    /*        $scope.signUp = function (newUser) {
                console.log(newUser);
                console.log(newUser.firstName);
            }
            */
    //        var sha256 = CryptoJS.algo.SHA256.create();

    /*        var body = {
                "lastName": $scope.lastName,
                "password": $scope.password,
                "email": $scope.email,
                "gender": $scope.gender,
                "firstName": $scope.firstName,
                "address": $scope.address
            };
    
            sha256.update("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false");
            sha256.update($scope.email);
            sha256.update("2EF3313BABACC399ED2618E437CF2");
    
            var hash = sha256.finalize();
            hash = hash.toString(CryptoJS.enc.Hex);
            
            $http.post("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false&signature=" + hash, body)
            .success(function (response) {
                toaster.pop('success', "Account Created Successfully", "");
                $location.path('/');
            })
            .error(function (response, status) {
                if (status == 406 && response.errorCode == "email_already_exists") {
                    $scope.fail = true;
                    $scope.failMessage = response.description;
                } else {
                    console.log(response);
                }
            });
    */

    /////////////////////////////////////////////////////////////////////////////////////////////////

});