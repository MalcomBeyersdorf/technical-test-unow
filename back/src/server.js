const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const securityRoutes = require("./routes/security.routes");
const { verifyToken } = require("./middlewares/authentication.middleware");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/healthz", (req, res) => {
  res.status(200).json({ message: "Server working" });
});

app.use("/security", securityRoutes);

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
