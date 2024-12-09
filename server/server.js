const app = require('./server-config.js');
const routes = require('./server-routes.js');
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const organizationsRoute = require("./routes/organizations.js");
const usersRoute = require("./routes/users.js");
const projectRoute = require("./routes/projects.js");
const tasksRoute = require("./routes/tasks.js");
const logger = require("./utils/logger.js");
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;
  logger.info(`Req ID: ${requestId} - ${req.method} - ${req.url}`);
  res.on("finish", () => {
    logger.info(
      `Request ID: ${requestId} - Response Status: ${res.statusCode}`
    );
  });
  next();
});

app.use("/organizations", organizationsRoute);
app.use("/users", usersRoute);
app.use("/projects", projectRoute);
app.use("/tasks", tasksRoute);



if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;