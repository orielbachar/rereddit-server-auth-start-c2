app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if ($scope.title === '') { return; }

    posts.create({
      title: $scope.title,
      link: $scope.link
    });

    $scope.title = '';
    $scope.link = '';
  }

  $scope.incrementUpvotes = function(item) {
    posts.upvote(item);
  };

  $scope.users = posts.users;
  $scope.addFriend = function(user){
    console.log(user);
    posts.addFriend(user);
  }
  $scope.friends = posts.friends
  $scope.isFriend = function(user){
  return posts.isFriend(user);
  }

}]);
