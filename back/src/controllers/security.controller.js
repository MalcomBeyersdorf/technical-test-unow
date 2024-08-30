require("dotenv").config();
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schemas/user.schema");
const { generateToken } = require("../utils/jwt.util");

const users = [
  {
    id: 1,
    username: "user1",
    password: bcrypt.hashSync("password1", 8), // Contraseña encriptada
  },
];

exports.signIn = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = generateToken({ id: user.id });
  res.json({ message: "Signed in successfully", token });
};

exports.signUp = async (req, res) => {
  const { firstName, lastName, job, birthDate, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      job,
      birthDate,
      username,
      password,
    });

    await user.save();
    const token = generateToken({ id: user._id });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.signOut = (_, res) => {
  res.json({ message: "Signed out successfully" });
};
