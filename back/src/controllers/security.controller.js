import User from "../schemas/user.schema.js";
import { generateToken } from "../utils/jwt.util.js";

export function signIn(req, res) {
  const { email, password } = req.body;

  const user = User.find((u) => u.email === email);
  if (!user || !compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken({ id: user._id });
  res.json({ message: "Signed in successfully", token });
}

export async function signUp(req, res) {
  const { firstName, lastName, job, birthDate, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      job,
      birthDate,
      email,
      password,
    });

    await user.save();
    const token = generateToken({ id: user._id });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

export function signOut(_, res) {
  res.json({ message: "Signed out successfully" });
}
