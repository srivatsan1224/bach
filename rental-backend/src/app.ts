import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors"; // Add CORS middleware
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import cartRoutes from "./routes/cartRoutes";
import rentalRoutes from "./routes/rentalRoutes";
// Load environment variables
dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5174", // ✅ Local development
  "http://localhost:3000", // ✅ If your frontend runs on port 3000
  "https://bachelors-web.vercel.app", // ✅ Hosted frontend
  "https://bachelors-preview.vercel.app/"
];
// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS Blocked Request from: ${origin}`); // Debugging log
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/rentals", rentalRoutes);

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
