const router = require("express").Router();

// TODO: build a /register controller
const fs = require("fs");
const dbPath = "./db/Users.json";
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checks if user entered all required values
    if ((!name, !email, !password)) {
      res.status(406).json({
        message: `Invalid schema`,
      });
      throw new Error("The used has provided undefined schema values");
    }

    // Instantiates a new model instance with provided object values
    const newUser = new User({ name, email, password });
    // Saves the model document into the collection
    await newUser.save();

    res.status(201).json({
      message: `User created!`,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

// TODO: build a /login controller

router.post("/login", async (req, res) => {
  console.log("login route hit.");
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(404).json({
        message: `User not found`,
      });
    } else {
      foundUser.password == password
        ? res.status(200).json({
            message: `User logged in`,
            foundUser,
          })
        : res.status(403).json({
            message: `Invalid password`,
          });
    }
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
});

function read() {
  const file = fs.readFileSync(dbPath);
  // converts a JSON object to object literal
  const fileObj = JSON.parse(file);
  return fileObj;
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
      return false;
    }
  });
  return true;
}

module.exports = router;
