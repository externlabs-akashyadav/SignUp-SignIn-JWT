require("dotenv").config();
const express = require("express");
const app = express.Router();

const signUp = require("../controllers/signup.user.controllers");
const signIn = require("../controllers/signin.user.controllers");

app.get("/", (req, res) => {
  res.send("Hello, Everything looks cool");
});

app.post("/signUp/", signUp.SignUpController);

app.post("/signIn/", signIn.SignInController);

module.exports = app;

// module.exports = { app };
//Doute : whey {} is not allowed in while exporting app
//sldfladf
