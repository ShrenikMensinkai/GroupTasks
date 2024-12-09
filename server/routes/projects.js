const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { GetProjects } = require("../actions/projects/get-projects");
const { CreateProject } = require("../actions/projects/create-project");
const authorization = require("../utils/authorization");

const projectCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  orgId: Joi.number().required(),
});

router.get("/", authorization, function (req, res, next) {
  let action = new GetProjects();
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
  const { error, value } = projectCreationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { name, description, orgId } = req.body;
  let { userId } = req.headers;
  let action = new CreateProject({ name, description, orgId, userId });
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
