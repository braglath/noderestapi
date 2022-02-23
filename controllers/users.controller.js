//! module imports
const bcryptjs = require("bcryptjs");
//! ///////////////////////

//! file imports
const userService = require("../services/users.services");
//! ///////////////////////

//? directly exporting the function
exports.register = (req, res, next) => {
  const { /* username , */ password } = req.body; //? if we put {} it will automatically get the value password from req.body
  //? to encrypt the password
  const salt = bcryptjs.genSaltSync(10);
  //? with the above salt we will encrypt the password
  req.body.password = bcryptjs.hashSync(password, salt); //? the reason to use sync method instead of just ash
  //? which is async is that we need to encrypt the password as soon as possible without any delay

  userService.register(req.body, (error, result) => {
    if (error) return next(error);
    return res.status(200).send({
      message: "success",
      data: result, //? result is we get it from mongodb
    });
  });
};
//! ////////////////////////

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  userService.login({ username, password }, (error, result) => {
    if (error) return next(error);
    return res.status(200).send({
      message: "success",
      data: result,
    });
  });
};
//! //////////////////////////////

exports.userProfile = (req, res, next) => {
  return res.status(200).json({ message: "Authorized user!" });
};
