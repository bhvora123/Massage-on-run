app.controller("ProfileCtrl", function ($scope, $http) {

        $http.get('/api/booking')
         .success(function (res) {
             $scope.bookingResults = res;
        });


        $scope.cancel = function (index) {
        $http.delete('/api/booking/' + index)
             .success(function (res) {
                 $scope.bookingResults = res;
             })
      }
});