var express = require('express');
var router = express.Router();

var UserModel = require('../models/Users');
var User = UserModel.User;

var expressJWT = require('express-jwt');
var auth = expressJWT({secret: UserModel.Secret});

//Get all users except for the user that is logged in
router.get('/friends', auth, function(req,res,next){
  var currentUser = req.user._id;
  var allUsers = User.find({"_id": { $nin: currentUser}}, function (err, users) {
      if (users){

      }
        res.send(users);
    });
});

//Add a friend(other user)
router.post('/add/:friendId', auth, function(req,res,next){
  var friend = req.params.friendId;

 User.findById(req.user._id, function (err,currentUser){
  currentUser.friends.push(friend);
  
    currentUser.save(function(err, user){
    if(err){ return next(err); }

    res.send(user);
});

  
    });
  });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
