const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoURI: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
  forgotTokenExpireIn: process.env.FORGOT_TOKEN_PASSWORD_IN,
  nodemailerService: process.env.NODEMAILER_SERVICE,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
};
