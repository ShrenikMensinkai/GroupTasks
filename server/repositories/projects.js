const httperror = require("http-errors");
const knex = require("../database/connection");
class ProjectsRepository {
  constructor() {
    this.PROJECT_TABLE = "projects";
  }
  async getAllProjects() {
    try {
      let result = await knex(this.PROJECT_TABLE);
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get project list"
      );
    }
  }

  async createProject({ name, description, orgId, createdBy }) {
    try {
      let result = await knex(this.PROJECT_TABLE)
        .insert({
          name,
          description,
          orgId,
          createdBy,
        })
        .returning("*");
      return result[0];
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Create Project"
      );
    }
  }

  async getProjectByOrgIdProjectId({ projectId, orgId }) {
    try {
      let result = await knex(this.PROJECT_TABLE).where({
        id: projectId,
        orgId,
      });
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get project list"
      );
    }
  }
}

exports.ProjectsRepository = ProjectsRepository;
