//! module imports
const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
//! //////////////////////

//! file imports
const userController = require("../controllers/users.controller");
//! /////////////////////

//!  routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);
//! ///////////////////////////////

module.exports = router;
