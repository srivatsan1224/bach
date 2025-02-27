import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors"; // Add CORS middleware
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import cartRoutes from "./routes/cartRoutes";

// Load environment variables
dotenv.config();

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "https://bachelors-web.onrender.com/", // Replace with your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);

// 404 Handler for undefined routes
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Global Error Handler:", err.message || err);
  res.status(err.status || 500).json({
    error: err.message || "An internal server error occurred.",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
