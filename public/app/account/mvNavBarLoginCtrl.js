angular.module('app').controller('mvNavBarLoginCtrl', function($scope) {
  $scope.signin = function(username, password) {
    console.log("Hola from the signin function from the mvNavBarLoginCtrl!")
  }
})