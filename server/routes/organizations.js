const Joi = require("joi");
const express = require("express");
const router = express.Router();
const {
  GetOrganization,
} = require("../actions/organizations/get-organization");

const {
  CreateOrganization,
} = require("../actions/organizations/create-organization");

const createOrganizationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
router.get("/", function (req, res, next) {
  let action = new GetOrganization();
  action
    .execute()
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

router.post("/", function (req, res, next) {
  const { error, value } = createOrganizationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { name, description } = req.body;
  let action = new CreateOrganization({ name, description });
  action
    .execute()
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
