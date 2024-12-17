import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { setupDatabaseAndContainer } from "./db";
import userRoutes from "./routes/userRoutes";
import dynamicRoutes from "./routes/api";

// Create an Express application
const app: Application = express();
const port: number = 3000;

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/api", dynamicRoutes);

// Function to start the server
async function startServer(): Promise<void> {
  try {
    await setupDatabaseAndContainer();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
