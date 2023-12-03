const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token.replace("Bearer ", ""), config.jwtSecret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid token", errorMessage: err.message });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
