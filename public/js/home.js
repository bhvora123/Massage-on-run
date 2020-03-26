app.controller("HomeCtrl", function ($scope, $log, $http, $location, $window, productService) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Scroll Module*/

    $scope.scrollTo = function (id) {
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    }

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /* -----------area----------- */

    $http.get("/area")
    .success(function (res) {
        $scope.area = res;
        $scope.selectedArea = $scope.area[0];
    });

    /* -----------time----------- */

    $http.get("/time")
    .success(function (res) {
        $scope.timeSlot = res
        $scope.selectedTime = $scope.timeSlot[0];
    });

    /* -----------date-----------*/

    $scope.selectedDate = new Date();

    /************bookinfo**************/

    $scope.bookInfo = function () {

        if ($scope.selectedArea.title == "" || $scope.selectedArea.title == "Select Area"){
            $scope.fail = true;
            $scope.failMessage = "Select Area";
            return;
        } else if ($scope.selectedDate == ""){
            $scope.fail = true;
            $scope.failMessage = "Select Date";
            return;        
        } else if ($scope.selectedTime == "") {
            $scope.fail = true;
            $scope.failMessage = "Select Time";
            return;
        }
        else {
            $scope.fail = false;
            $scope.failMessage = "";
            $scope.info = [
                $scope.selectedArea,
                $scope.selectedTime,
                $scope.selectedDate
            ];
            productService.addProduct($scope.info);
            $location.path('/booking');
            console.log("bbbbbbbb")

        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*User Module - login, logout, register*/

    /*Check if already logged in*/
    $scope.access_token = $cookieStore.get('access_token');

    /*View My Profile*/
    $scope.viewMyProfile = function () {
        $location.path('/profile/' + $cookieStore.get('uid'));
    };

    /*Login function*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        modalInstance.result.then(function () {
            $scope.access_token = $cookieStore.get('access_token');
        });
    };

    /*Logout function*/
    $scope.logout = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('uid');
        $scope.access_token = $cookieStore.get('access_token');
    };

    /*Signup click - Redirect to signup page*/
    $scope.signUp = function () {
        $location.path('/signup');
    };

       
    /************contact us******************/
    $scope.sendEmail = function () {

        /* Validate */
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if ($scope.email == null || $scope.email == "" || !emailFilter.test($scope.email) || $scope.email.match(illegalChars)) {
            $scope.failEmail = "Provide a valid email address";
        } else {
            $scope.failEmail = false;
        }

        if ($scope.message == null || $scope.message == "") {
            $scope.failMessage = "Provide your feedback";
        } else {
            $scope.failMessage = false;
        }

        if ($scope.failMessage || $scope.failEmail) {
            return
        }

        var body = {
            "client_id": "ext-bhavin-vora",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": "bhvora123@gmail.com",
            "password": "bhvora123",
            "grant_type": "password",
            "scope": "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        delete $http.defaults.headers.common.Authorization;

        $http.post("https://api-dev.xyz:123/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            $http.defaults.headers.common.Authorization = "Bearer " + response.access_token;

            $http.post("https://api-dev.xyz:123/v1/users/250110403/user-messages",
                {
                    "body": "Message: " + $scope.message + " Email: " + $scope.email + " Phone: " + $scope.phoneNumber,
                    "title": "Message from: " + $scope.name,
                    "messageType": "USER_TEXT"
                })
            .success(function (response) {
                toaster.pop('success', "Thank You for your feedback", "");
            })
        })
        .error(function (response) {
            console.log(response);
        });

    }



    /************************Scroll Module********************************/

    $scope.scrollTo = function (id) {
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    }

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

});