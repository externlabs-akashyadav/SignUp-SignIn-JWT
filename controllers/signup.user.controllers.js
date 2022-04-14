require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const SignUpController = async function (req, res) {
  const { username, password: plainText, email } = req.body;

  const findEmail = await User.findOne({ email });
  if (findEmail) {
    res.send(
      `You are alerdy registered! Your username is : ${findEmail.username}`
    );
    return;
  }

  if (!username || typeof username != "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainText || typeof plainText != "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (Number(plainText.length) < 5) {
    return res.json({
      status: "error",
      error: "password too small length should be more then 5",
    });
  }

  const password = bcrypt.hashSync(plainText, 10);

  try {
    const response = User.create({
      username,
      email,
      password,
    });
    console.log("User created sussfully: ", response);
  } catch (err) {
    console.log(JSON.stringify(error));
  }

  console.log(req.body);
  res.json({
    status: "Registred Successfully",
    userDetails: req.body,
  });
};

module.exports = { SignUpController };
