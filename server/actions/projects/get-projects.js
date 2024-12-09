const httperror = require("http-errors");
const { ProjectsRepository } = require("../../repositories/projects");
const logger = require("../../utils/logger");

class GetProjects {
  constructor() {}
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Get Projects`);
      let projectsRepository = new ProjectsRepository();
      let projects = await projectsRepository.getAllProjects();
      return projects;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Project list"
      );
    }
  }
}

exports.GetProjects = GetProjects;
