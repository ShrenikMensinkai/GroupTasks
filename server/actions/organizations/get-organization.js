const httperror = require("http-errors");
const { OrganizationsRepository } = require("../../repositories/organizations");

class GetOrganization {
  constructor() {}
  async execute() {
    try {
      let organizationsRepository = new OrganizationsRepository();
      return await organizationsRepository.getAllOrganizations();
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get organization list"
      );
    }
  }
}

exports.GetOrganization = GetOrganization;
