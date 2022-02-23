//! modules import
const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
//! /////////////////////////

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//! setting a json response and removing fields which we dont need to show in the response
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //? removing the _id , _v values and the encrypted password from the response
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // delete returnedObject.password;
  },
});
//! //////////////////////////////////////

//! setting a validator for email id just to make sure it is not duplicate
userSchema.plugin(uniqueValidator, { message: "Email already in use" });

const User = mongoose.model("user", userSchema);

module.exports = User;
