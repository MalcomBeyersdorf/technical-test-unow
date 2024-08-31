import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import securityRoutes from "./routes/security.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import { generateToken } from "./utils/jwt.util.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());
app.use(cors()); // Necesario para desarrollo

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/healthz", (_, res) => {
  res.status(200).json({ message: "Server working" });
});

app.use("/security", securityRoutes);
app.use("/employees", employeesRoutes);

app.get("/jobs/types", async (_, res) => {
  try {
    const response = await axios.get("https://ibillboard.com/api/positions");
    const positions = response.data.positions;
    const jobTypes = positions;

    res.status(200).json({ jobTypes });
  } catch (error) {
    console.error("Error fetching job positions:", error);
    res.status(500).json({ error: "Error fetching job positions" });
  }
});

app.get("/test-token", (_, res) => {
  const token = generateToken({ data: "payload" });
  res.status(200).json({ token: token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
