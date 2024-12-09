const httperror = require("http-errors");
const { OrganizationsRepository } = require("../../repositories/organizations");

class CreateOrganization {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
  }
  async execute() {
    try {
      let organizationsRepository = new OrganizationsRepository();
      return await organizationsRepository.createOrganizations({
        name: this.name,
        description: this.description,
      });
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to Create organization"
      );
    }
  }
}

exports.CreateOrganization = CreateOrganization;
