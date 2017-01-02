app.factory('posts', ['$http' , 'auth', function($http, auth) {
  var postService = {
    posts: [],
    users:[],
    friends:[],

    getAll: function() {
      return $http.get('/posts', {
        headers: {
         "Authorization": 'Bearer ' + auth.getToken()
     }
      }).then(function(data) {

        angular.copy(data.data, postService.posts);
      });
    },

    get: function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    },

    create: function(post) {
      return $http.post('/posts', post).success(function(data){
        postService.posts.push(data);
      })
    },

    upvote: function(post) {
      // TODO: Finish
    },

    addComment: function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment);
    },

    upvoteComment: function(post, comment) {
      // TODO: Finish
    },

    getUsers: function(){
      return $http.get('/users/friends/', {
        headers: {
         "Authorization": 'Bearer ' + auth.getToken()
     }}).then(function(res){
       console.log(res.data);
       angular.copy(res.data, postService.users);
     })
   },

   addFriend: function(user){
     return $http.post('/users/add/' + user._id, null, {
       headers: {
        "Authorization": 'Bearer ' + auth.getToken()
      }
    }).then(function(res){
      console.log(res.data);
      angular.copy(res.data, postService.friends);
    });
   }

  }
  return postService;
}]);
