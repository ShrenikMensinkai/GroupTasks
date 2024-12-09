const httperror = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UsersRepository } = require("../../repositories/users");
const logger = require("../../utils/logger");

class UserLogin {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - User Login`);
      let usersRepository = new UsersRepository();
      let user = await usersRepository.getUserByEmailId(this.email);
      if (!user || (typeof user === "object" && Object.keys(user) === 0)) {
        throw new httperror(400, "Email/Password Incorrect");
      }
      let isValid = bcrypt.compareSync(this.password, user.password);
      if (!isValid) {
        throw new httperror(400, "Email/Password Incorrect");
      }
      delete user.password;
      let token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return {
        token,
        userId: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Login User Failed"
      );
    }
  }
}

exports.UserLogin = UserLogin;
