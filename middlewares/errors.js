//! error modelling middlewares, these are used to show errors on the client side

function errorHandler(err, req, res, next) {
  if (
    typeof err === "String" //? to check object type we are using three ===
  )
    return res.status(400).json({ message: err }); //? instead of message we can also pass the status code

  if (
    typeof err === "ValidationError" //? this validation error mostly comes from mongoose db
  )
    return res.status(400).json({ message: err.message });

  if (
    typeof err === "UnauthorizedError" //? this validation error mostly comes from mongoose db
  )
    return res.status(401).json({ message: err.message });

  //? else statement
  return res.status(500).json({ message: err.message });
}

module.exports = { errorHandler };
