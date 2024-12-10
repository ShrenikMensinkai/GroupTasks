const httperror = require("http-errors");
const bcrypt = require("bcryptjs");
const { UsersRepository } = require("../../repositories/users");
const { ProjectsRepository } = require("../../repositories/projects");
const logger = require("../../utils/logger");

class UserRegistration {
  constructor({ name, email, password, orgId, projectIds }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.orgId = orgId;
    this.projectIds = projectIds;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - User Registration`);
      let usersRepository = new UsersRepository();
      let projectsRepository = new ProjectsRepository();
      let projectDetails =
        await projectsRepository.getProjectsByOrgIdProjectIDS({
          projectIds: this.projectIds,
          orgId: this.orgId,
        });
      if (projectDetails.length !== this.projectIds.length) {
        throw new httperror.BadRequest("Invalid Project IDs");
      }
      let encryptedPassword = await bcrypt.hash(this.password, 3);
      return await usersRepository.createUser({
        name: this.name,
        email: this.email,
        orgId: this.orgId,
        password: encryptedPassword,
        projectIds: this.projectIds,
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
