const httperror = require("http-errors");
const { UsersRepository } = require("../../repositories/users");
const logger = require("../../utils/logger");

class GetUsers {
  constructor() {}
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Get User`);
      let usersRepository = new UsersRepository();
      let users = await usersRepository.getAllUsers();
      users = users.map((user) => ({
        name: user.name,
        id: user.id,
        email: user.email,
      }));
      return users;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get user list"
      );
    }
  }
}

exports.GetUsers = GetUsers;
