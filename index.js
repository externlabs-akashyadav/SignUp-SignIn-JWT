const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 5001;
const app = express();
const JWT_SECRATE = "LKASJDHLashdlKJHSDjalskdjhASDHLkasdhl";
const User = require("./models/user.model.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { use } = require("express/lib/application");

mongoose.connect(
    "mongodb+srv://akashyadav:Akash123@cluster0.bkoc9.mongodb.net/LoginLogout?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //usecreateIndex: true,
    }
);

app.use("/", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json());

app.post("/api/signup", (req, res) => {
    const { username, password: plainText } = req.body;

    // console.log("username: ", username);
    // console.log("passsword: ", plainText);

    if (!username || typeof username != "string") {
        return res.json({ status: "error", error: "Invalid username" });
    }

    if (!plainText || typeof plainText != "string") {
        return res.json({ status: "error", error: "Invalid password" });
    }
    if (plainText.length < 5) {
        return res.json({
            status: "error",
            error: "password too small length should be more then 5",
        });
    }

    const password = bcrypt.hashSync(plainText, 10);
    console.log("has password: ", password);

    // const user = User.findOne({ username });

    // console.log(user.username);

    // if()

    try {
        const response = User.create({
            username,
            password,
        });
        console.log("User created sussfully: ", response);
    } catch (err) {
        // console.log(JSON.stringify(error));

        if (err.code === 11000) {
            return res.json({ status: "error", err: "username is already in use" });
        }
        // throw err;
    }

    console.log(req.body);
    res.json({ status: "ok" });
});

app.post("/api/signin", async(req, res) => {
    //res.json({ status: "ok", data: "running" });

    const { username, password } = req.body;
    console.log(username, password);

    if (!(username && password)) {
        res.status(400).send("All input is required");
    }

    // const user = User.findOne({ username }).lean();
    const user = await User.findOne({ username });

    console.log(user.username);

    if (!user) {
        return res.json({ status: "error", error: "Invalid username or password" });
    }

    // if (bcrypt.compare(password, user.password)) {
    //     const token = jwt.sign({ id: user._id, username: user.username },
    //         JWT_SECRATE
    //     );

    //     try {
    //         const decoded = jwt.verify(token, JWT_SECRATE);
    //         req.user = decoded;
    //     } catch (err) {
    //         return res.status(401).send("Invalid Token");
    //     }
    //     // return next();
    //     user.token = token;

    //     return res.json({ status: "ok", data: token });
    // }

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        var token;
        // var isRememberMe = req.body.isRememberMe;
        // if (isRememberMe.toLowerCase() === "yes") {
        //     token = jwt.sign({ id: user._id, username: user.usernam }, JWT_SECRATE, {
        //         expiresIn: "1095d",
        //     });
        //     console.log(" remember me");
        // } else {
        token = jwt.sign({ id: user._id, username: user.usernam }, JWT_SECRATE, {
            expiresIn: "2h",
        });

        // console.log("not remember me");
        // }

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
    }

    return res.json({ status: "error", error: "Invalid username or password" });
});

app.post("/api/change-password", (req, res) => {});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log("server up at " + port);
});