app.controller('NavCtrl', ['$scope', 'auth', '$state', function($scope, auth, $state){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = function(){
    auth.logOut();
    $state.go('register');

  };
}]);
