app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function () {
    auth.register($scope.user).then(function(){
      $state.go('home');
    });

  };

  $scope.login = function(){
    auth.login($scope.user).then(function(){
      $state.go('home');
    });
  };
}])
