const httperror = require("http-errors");
const knex = require("../database/connection");
class TaskRepository {
  constructor() {
    this.TASKS_TABLE = "tasks";
  }
  async getAllTasks() {
    try {
      let result = await knex(this.TASKS_TABLE);
      return result;
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Task list"
      );
    }
  }

  async createTask({
    title,
    description,
    status,
    assignee,
    projectId,
    orgId,
    createdBy,
  }) {
    try {
      let result = await knex(this.TASKS_TABLE)
        .insert({
          title,
          description,
          status,
          assignee,
          projectId,
          orgId,
          createdBy,
        })
        .returning("*");
      return result[0];
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Create Task"
      );
    }
  }

  async updateTask({ title, description, status, assignee, taskId, userId }) {
    try {
      const updateDate = {};
      if (title) updateDate.title = title;
      if (description) updateDate.description = description;
      if (status) updateDate.status = status;
      if (assignee) updateDate.assignee = assignee;
      if (title || description || status || assignee)
        updateDate.updatedBy = userId;
      let result = await knex(this.TASKS_TABLE)
        .where({ id: taskId })
        .update(updateDate)
        .returning("*");
      return result[0];
    } catch (error) {
      throw new httperror(
        error.status || 400,
        error.message || "Failed to get Update Task"
      );
    }
  }
}

exports.TaskRepository = TaskRepository;
