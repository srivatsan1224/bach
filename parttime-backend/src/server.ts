import express from "express";
import { config } from "./config";
import jobRoutes from "./routes/jobRoutes";
import "./utils/dbClient"; // Ensure DB connection is initialized

const app = express();
const port = config.port || 3002;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/jobs", jobRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
