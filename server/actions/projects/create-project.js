const httperror = require("http-errors");
const bcrypt = require("bcryptjs");
const { ProjectsRepository } = require("../../repositories/projects");
const logger = require("../../utils/logger");

class CreateProject {
  constructor({ name, description, orgId, userId }) {
    this.name = name;
    this.description = description;
    this.orgId = orgId;
    this.userId = userId;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Create Project`);
      let projectsRepository = new ProjectsRepository();
      return await projectsRepository.createProject({
        name: this.name,
        description: this.description,
        orgId: this.orgId,
        createdBy: this.userId,
      });
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to create Project"
      );
    }
  }
}

exports.CreateProject = CreateProject;
