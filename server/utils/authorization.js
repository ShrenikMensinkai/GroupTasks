const jwt = require("jsonwebtoken");
const httperror = require("http-errors");

function authorization(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    throw new httperror(401, "unauthorized");
  } else {
    try {
      token = token.replace("Bearer", "").replace(" ", "");
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.headers.userId = decoded.userId;
      next();
    } catch (error) {
      throw new httperror(
        error.status || 500,
        error.message || "Internal server error"
      );
    }
  }
}
module.exports = authorization;
