const httperror = require("http-errors");
const knex = require("../database/connection");
class OrganizationsRepository {
  constructor() {
    this.ORGANIZATIONS_TABLE = "organizations";
  }
  async getAllOrganizations() {
    try {
      let result = await knex(this.ORGANIZATIONS_TABLE);
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get organization list"
      );
    }
  }

  async createOrganizations({ name, description }) {
    try {
      let result = await knex(this.ORGANIZATIONS_TABLE)
        .insert({
          name,
          description,
        })
        .returning("*");
      return result[0];
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to Create organization"
      );
    }
  }
}

exports.OrganizationsRepository = OrganizationsRepository;
