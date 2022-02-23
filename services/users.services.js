/** 
 This will be used in the controller file
 We will consume the user model and create a method for register and login
 **/

//! modules import
const bcrypt = require("bcryptjs");
//! ////////////////////////

//! files import
const User = require("../models/user.model");
const auth = require("../middlewares/auth");
//! ///////////////////////////

//! using async here as we are connecting with mongoose db and we can use it to async and await
//! function for login
async function login({ username, password }, callback) {
  const user = await User.findOne({ username });
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password!",
    }); //! check these functions
  }
}
//! //////////////////////////////////

//! function to register a user
async function register(params, callback) {
  if (params.username === undefined) {
    return callback({ message: "Username is required" });
  }
  const user = new User(params);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = { login, register };
