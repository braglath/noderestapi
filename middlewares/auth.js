//! modules import
const jwt = require("jsonwebtoken");
//! //////////////////

//! authenticate a token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log('🚀 ~ file: auth.js ~ line 8 ~ authenticateToken ~ authHeader', authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log('🚀 ~ file: auth.js ~ line 10 ~ authenticateToken ~ token', token);
  //? the above 2 will get the token from the header
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    "Snipper_SecretKEY", //? verify the token with the secret key
    //? the above secret key is a dummy one, we can create a new one and put those in the dotenv file
    //? check code simple yt for rest jwt with node video
    (err, user) => {
      if (err) return res.sendStatus(403);
      //! else statement
      req.user = user; //? adding the user value to the req.user so we can get that from other methods
      next();
    }
  );
}
//! ///////////////////////////////////////////////////

//! after successful login, user will get token also in the response
function generateAccessToken(username) {
  return jwt.sign(
    { data: username }, //? we can also pass other data also if we want in that token
    "Snipper_SecretKEY", //? verify the token with the secret key
    //? the above secret key is a dummy one, we can create a new one and put those in the dotenv file
    //? check code simple yt for rest jwt with node video
    { expiresIn: "1h" } //? setting an expiry date, in this case we are giving 1hour for the token to expire
    //? we can also have as many days as we want
  );
}
//! //////////////////////////////////////////////

module.exports = { authenticateToken, generateAccessToken }; //? exporting both the functions
