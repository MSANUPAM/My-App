const userController = require("./users");
const jwt = require('jsonwebtoken');
const variables = require("../constants/variables");

module.exports = {
  signin: function (connect, callback, userName, password) {
    userController.getUsers(connect, (err, userList) => {
      if (err) {
        return callback(Error('Error in get users'), { loggedIn: false, token:null, user:null })
      }
      let user = userList.find(user => user.userName == userName);
      
      if (!user) {
        return callback(new Error('username not found in database!'), { loggedIn: false, token:null, user:null })
      }
      if (user.password !== password) {
        return callback(new Error('password is incorrect!'), { loggedIn: false, token:null, user:null });
      }
      delete user.password;
      let token = jwt.sign(user, variables.accessTokenSecret);
      return callback(null, { loggedIn: true, token: token, user: user });
    })
  }
}