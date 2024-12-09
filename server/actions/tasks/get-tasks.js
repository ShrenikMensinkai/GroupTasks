const httperror = require("http-errors");
const { TaskRepository } = require("../../repositories/tasks");
const logger = require("../../utils/logger");

class GetTasks {
  constructor() {}
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Get Tasks`);
      let taskRepository = new TaskRepository();
      let tasks = await taskRepository.getAllTasks();
      return tasks;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Task list"
      );
    }
  }
}

exports.GetTasks = GetTasks;
