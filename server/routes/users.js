const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { UserRegistration } = require("../actions/users/user-registration");
const { GetUsers } = require("../actions/users/get-user");
const { UserLogin } = require("../actions/users/user-login");
const authorization = require("../utils/authorization");

const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(12).required(),
  orgId: Joi.number().required(),
  projectIds: Joi.array().items(Joi.number()),
});

const useLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(12).required(),
});

router.get("/", authorization, function (req, res, next) {
  let action = new GetUsers();
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

router.post("/registration", function (req, res, next) {
  const { error, value } = userRegistrationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { name, email, password, orgId, projectIds } = req.body;
  let action = new UserRegistration({
    name,
    email,
    password,
    orgId,
    projectIds,
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

router.post("/login", function (req, res, next) {
  const { error, value } = useLoginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { email, password } = req.body;
  let action = new UserLogin({ email, password });
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
