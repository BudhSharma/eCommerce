const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateAdminToken(req, res, next) {
  const token = req.cookies.adminAccessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid token", errorMessage: err.message });
    }

    req.adminuser = decoded;
    next();
  });
}

module.exports = { authenticateAdminToken };
