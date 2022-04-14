require("dotenv").config();
require("./connection/mongoDatabaseConnection").MongoConnection();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routers/user.routers");

// app.use(express.json());
app.use(bodyParser.json());

// const routes = require("./api/routes.js");
app.use("/", routes);

// const { PORT } = process.env;
const port = process.env.PORT1 || 4000;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
