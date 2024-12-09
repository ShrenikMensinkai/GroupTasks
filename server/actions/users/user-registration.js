const httperror = require("http-errors");
const bcrypt = require("bcryptjs");
const { UsersRepository } = require("../../repositories/users");
const logger = require("../../utils/logger");

class UserRegistration {
  constructor({ name, email, password, orgId }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.orgId = orgId;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - User Registration`);
      let usersRepository = new UsersRepository();

      let encryptedPassword = await bcrypt.hash(this.password, 3);
      return await usersRepository.createUser({
        name: this.name,
        email: this.email,
        orgId: this.orgId,
        password: encryptedPassword,
      });
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "User Registration Failed"
      );
    }
  }
}

exports.UserRegistration = UserRegistration;
