//! module imports
const express = require("express");
const mongoose = require("mongoose");
const unless = require("express-unless");
//! //////////////////////////////////////////

//! file imports
const dbconfig = require("./config/db.config");
const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");
const userRoute = require("./routes/users.routes");
//! //////////////////////////////////////

//! variables
const port = process.env.port || 8080;
//! ////////////////////////////

const app = express();

//! connecting with mongoose db
mongoose.Promise = global.Promise;
mongoose
  .connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log("Database connected"),
    (error) => console.log(`Database can't be connected with error - ${error}`)
  );
//! /////////////////////////////////////////////////////////////////////////////

//! middleware to authenticate a token
auth.authenticateToken.unless = unless; //? with help of unless it will check for the condition
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
      //? we dont want the token to be authenticated on these pages
      //? authenticate token other than these pages
    ],
  })
);
//! ///////////////////////////////////////////////////

app.use(express.json()); //? for using json objects

//! connect with the routes
app.use("/users", userRoute);
//! //////////////////////////

//! errors middleware
app.use(errors.errorHandler);
//! //////////////////////

//! time to start the server
app.listen(port, () => console.log(`🚀 ~ listening on port ${port}`));
//! //////////////////////////
