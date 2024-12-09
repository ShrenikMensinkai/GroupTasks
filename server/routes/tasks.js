const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { GetTasks } = require("../actions/tasks/get-tasks");
const { CreateTask } = require("../actions/tasks/create-tasks");
const { UpdateTask } = require("../actions/tasks/update-task");
const authorization = require("../utils/authorization");

const taskCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("pending", "in-progress", "done"),
  assignee: Joi.number().required(),
  orgId: Joi.number().required(),
  projectId: Joi.number().required(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("pending", "in-progress", "done"),
  assignee: Joi.number(),
});

router.get("/", authorization, function (req, res, next) {
  let action = new GetTasks();
  action
    .execute(req)
    .then((result) => {
      res.status(200).send({
        data: result,
      });
    })
    .catch((err) => {
      res.status(err.status || 400).send({
        data: err.message || "bad request",
      });
    });
});

router.post("/", authorization, function (req, res, next) {
  const { error, value } = taskCreationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { title, description, status, assignee, projectId, orgId } = req.body;
  let { userId } = req.headers;
  let action = new CreateTask({
    title,
    description,
    status,
    assignee,
    projectId,
    orgId,
    userId,
  });
  action
    .execute(req)
    .then((result) => {
      res.status(200).send({
        data: result,
      });
    })
    .catch((err) => {
      res.status(err.status || 400).send({
        data: err.message || "bad request",
      });
    });
});

router.patch("/:taskId", authorization, function (req, res, next) {
  const { error, value } = taskUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { title, description, status, assignee } = req.body;
  let { userId } = req.headers;
  let { taskId } = req.params;
  let action = new UpdateTask({
    taskId,
    title,
    description,
    status,
    assignee,
    userId,
  });
  action
    .execute(req)
    .then((result) => {
      res.status(200).send({
        data: result,
      });
    })
    .catch((err) => {
      res.status(err.status || 400).send({
        data: err.message || "bad request",
      });
    });
});

module.exports = router;
