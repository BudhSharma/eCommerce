const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessToken(user) {
  return jwt.sign({ user }, config.jwtSecret, {
    expiresIn: config.accessTokenExpiresIn,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, config.jwtSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
