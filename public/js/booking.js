app.controller("BookingCtrl", function ($scope, $http, $location, $window, productService) {

    $scope.gotoHome = function(){
        $location.path('/')
    }

    /* -----------area----------- */

    $scope.products = productService.getProducts();
    if (($scope.products).length == 0) {
        $scope.products = []
        $scope.products[0] = [
        { title: 'Select Area', value: 0 },
         { time: "06.00 am" }
        ]
        $scope.area = [
            { title: 'Select Area', value: 0 },
            { title: 'Borivali - Khar', value: 500 },
            { title: 'Bandra - Churchgate', value: 700 }
        ];
        $scope.selectedArea = $scope.area[0];
    } else {
        $scope.area = [
         {
             title: $scope.products[0][0].title,
             value: $scope.products[0][0].value
         }
        ];
        $scope.selectedArea = $scope.area[0];
        $scope.selectedArea.title = $scope.area[0].title;
    }


    /* -----------time----------- */

    $scope.timeSlot = ['06.00 am', '06.30 am', '07.00 am', '07.30 am', '08.00 am', '08.30 am', '09.00 am', '09.30 am', '10.00 am', '10.30 am', '11.00 am', '11.30 am', '12.00 pm', '12.30 pm', '01.00 pm', '01.30 pm', '02.00 pm', '02.30 pm', '03.00 pm', '03.30 pm', '04.00 pm', '04.30 pm', '05.00 pm', '05.30 pm', '06.00 pm', '06.30 pm', '07.00 pm', '07.30 pm', '08.00 pm', '08.30 pm', '09.00 pm', '09.30 pm', '10.00 pm', '10.30 pm'];
    $scope.selectedTime = $scope.timeSlot[0];

    /* -----------date-----------*/

    $scope.selectedDate = new Date();

    /* -----------oil----------- */

    $scope.oil = [
        { title: 'No I will use my own special Oil', value: 0 },
        { title: 'Yes thats awesome', value: 300 }
    ];
    $scope.selectedOil = $scope.oil[0];

    /* -----------table----------- */
    $scope.table = [
//        { title: 'Do you have a Massage Table?', value: null },
        { title: 'Yes, I have a table', value: 0 },
        { title: 'No, kindly bring a table', value: 300 }
    ];
    $scope.selectedTable = $scope.table[0];

    /*    $scope.$watch("selectedTable", function (newValue, oldValue) {
            $scope.tablePrice = newValue.value;
        });
        */

    /********* Login **************/
    $scope.login = function () {

        /* Validation */
        if ($scope.email == "" || $scope.email == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid email address";
            return;
        } else if ($scope.password == "" || $scope.password == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid password";
            return;
        }

        $scope.fail = false;
    }

    /***********Signup click*****************/
    /*    $scope.signUp = function () {
    
            /* Validation 
            var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
            var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    
            if ($scope.details.firstName == null || $scope.details.firstName == "") {
                $scope.fail = true;
                $scope.failMessage = "Provide First Name";
                return;
            } else if ($scope.details.lastName == null || $scope.details.lastName == "") {
                $scope.fail = true;
                $scope.failMessage = "Provide Last Name";
                return;
            } else if ($scope.details.password == "" || $scope.details.password == null || $scope.details.password.length < 6) {
                $scope.fail = true;
                $scope.failMessage = "Password must be atleast 6 characters long";
                return;
            } else if ($scope.details.password != $scope.details.rePassword) {
                $scope.fail = true;
                $scope.failMessage = "Passwords must match";
                return;
            } else if ($scope.details.gender == "" || $scope.details.gender == null) {
                $scope.fail = true;
                $scope.failMessage = "Provide a valid gender";
                return;
            } else if ($scope.details.address == "" || $scope.details.address == null) {
                $scope.fail = true;
                $scope.failMessage = "Provide a valid Address";
                return;
            } else if ($scope.details.email == null || $scope.details.email == "" || !emailFilter.test($scope.details.email) || $scope.details.email.match(illegalChars)) {
                $scope.fail = true;
                $scope.failMessage = "Provide a valid email address";
                return;
            }
    
            $scope.fail = false;
        }
    */

    $scope.details = [];

    $scope.date = new Date();
/*    day = date.getDate();
    year = date.getFullYear();
    month = date.getMonth();
    
    $scope.ndate = new Date();
    $scope.ndate.setYear(year)
    $scope.ndate.setMonth(month)
    $scope.ndate.setDate(day)

    console.log($scope.selectedDate)
    console.log(date)
    console.log("ndate")
    console.log($scope.ndate)
*/
    $scope.book = function (details) {

        $scope.details = details;

        if($scope.selectedArea.title == "Select Area" || $scope.selectedArea.title == "") {
            $scope.fail = true;
            $scope.failMessage = "Kindly select area";
            return;
        } else if ($scope.selectedDate == "" || ($scope.selectedDate < $scope.date)) {
            $scope.fail = true;
            $scope.failMessage = "Kindly select a valid Date";
            return;
        } else if ($scope.details.firstName == null || $scope.details.firstName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide First Name";
            return;
        } else if ($scope.details.lastName == null || $scope.details.lastName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide Last Name";
            return;
        } else if ($scope.details.gender == "" || $scope.details.gender == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid gender";
            return;
        } else if ($scope.details.address == "" || $scope.details.address == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid Address";
            return;
        } else if ($scope.details.phone == "" || $scope.details.phone == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid phone Number";
            return;
        }

        $scope.fail = false;

        console.log(details);

    }

});