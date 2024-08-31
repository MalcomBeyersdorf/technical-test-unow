import User from "../schemas/user.schema.js";

export async function createEmployee(req, res) {
  try {
    const { firstName, lastName, job, birthDate } = req.body;
    const user = new User({ firstName, lastName, job, birthDate });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllEmployees(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getEmployeeById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { firstName, lastName, job, birthDate } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, job, birthDate },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
