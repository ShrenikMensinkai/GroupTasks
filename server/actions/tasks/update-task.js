const httperror = require("http-errors");
const { TaskRepository } = require("../../repositories/tasks");
const logger = require("../../utils/logger");

class UpdateTask {
  constructor({ taskId, title, description, status, assignee, userId }) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.assignee = assignee;
    this.taskId = taskId;
    this.userId = userId;
  }
  async execute(req) {
    try {
      logger.info(`Request Id: ${req.requestId} - Update Task`);
      let taskRepository = new TaskRepository();
      return await taskRepository.updateTask({
        title: this.title,
        description: this.description,
        status: this.status,
        assignee: this.assignee,
        taskId: this.taskId,
        createdBy: this.userId,
      });
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to Update Task"
      );
    }
  }
}

exports.UpdateTask = UpdateTask;
