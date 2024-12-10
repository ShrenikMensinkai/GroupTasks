const httperror = require("http-errors");
const { TaskRepository } = require("../../repositories/tasks");
const logger = require("../../utils/logger");
const { ProjectsRepository } = require("../../repositories/projects");
const { UsersRepository } = require("../../repositories/users");

class CreateTask {
  constructor({
    title,
    description,
    status,
    assignee,
    projectId,
    orgId,
    userId,
  }) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.assignee = assignee;
    this.projectId = projectId;
    this.orgId = orgId;
    this.userId = userId;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Create Task`);
      let taskRepository = new TaskRepository();
      let projectsRepository = new ProjectsRepository();
      let usersRepository = new UsersRepository();

      let user = await usersRepository.getUserById({
        userId: this.userId,
      });
      let userProjects = user.projects;
      if (!userProjects.includes(this.projectId)) {
        throw new httperror(401, " Unauthorized");
      }
      let project = await projectsRepository.getProjectByOrgIdProjectId({
        projectId: this.projectId,
        orgId: this.orgId,
      });

      if (
        !project ||
        (typeof project === "object" && Object.keys(project).length === 0)
      ) {
        throw new httperror.NotFound("Project Not Found");
      }
      return await taskRepository.createTask({
        title: this.title,
        description: this.description,
        status: this.status,
        assignee: this.assignee,
        projectId: this.projectId,
        orgId: this.orgId,
        createdBy: this.userId,
      });
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to Create Task"
      );
    }
  }
}

exports.CreateTask = CreateTask;
