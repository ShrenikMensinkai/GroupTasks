const httperror = require("http-errors");
const knex = require("../database/connection");
class UsersRepository {
  constructor() {
    this.USERS_TABLE = "users";
  }
  async getAllUsers() {
    try {
      let result = await knex(this.USERS_TABLE);
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get user list"
      );
    }
  }

  async createUser({ name, email, password, orgId, projectIds }) {
    try {
      let result = await knex(this.USERS_TABLE)
        .insert({
          name,
          email,
          password,
          orgId,
          projects: JSON.stringify(projectIds),
        })
        .returning("*");
      return "User Createion Success";
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to create User"
      );
    }
  }

  async getUserByEmailId(email) {
    try {
      let result = await knex(this.USERS_TABLE).where({ email: email }).first();
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get user list"
      );
    }
  }

  async getUserById({ userId }) {
    try {
      let result = await knex(this.USERS_TABLE).where({ id: userId }).first();
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get user"
      );
    }
  }
}

exports.UsersRepository = UsersRepository;
