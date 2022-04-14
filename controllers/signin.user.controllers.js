require("dotenv").config();

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignInController = async (req, res) => {
  const { password, email } = req.body;
  //   console.log(username, password, email);

  if (!(password && email)) {
    res.status(400).send("All input is required");
  }

  const user = await User.findOne({ email });

  //   console.log(user.email);

  if (!user) {
    return res.json({ status: "error", error: "Invalid email or password" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    var token;

    token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRATE,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    res.status(200).json({
      status: "Successfully Login",
      user: user,
    });
    console.log(`Login Successfully! ${user}`);
  } else {
    return res.json({ status: "error", error: "Invalid username or password" });
  }
};

module.exports = { SignInController };
