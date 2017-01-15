app.factory('posts', ['$http' , 'auth', function($http, auth) {
  var postService = {
    posts: [],
    users:[],
    friends:[],
    currentAccount:{},

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
       angular.copy(res.data, postService.users);
       postService.getAccount();
     })
   },

   addFriend: function(user){
     return $http.post('/users/add/' + user._id, null, {
       headers: {
        "Authorization": 'Bearer ' + auth.getToken()
      }
    }).then(function(res){
      console.log(res.data);
      postService.friends.push(res.data);
    });
  },

  getAccount: function(){
    return $http.get('/users/myAccount/' ,{
      headers: {
       "Authorization": 'Bearer ' + auth.getToken()
     }
   }).then(function(res){
      postService.currentAccount = res.data;
   })
  },

  isFriend: function(user){

    for (var i = 0; i < postService.currentAccount.friends.length; i++) {
      if(postService.currentAccount.friends[i] == user._id){
          return true;
        }
      } return false;
    }

  }
  return postService;
}]);
