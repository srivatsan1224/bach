import * as express from "express";
import * as cors from "cors";
import config from "./config"; // Your centralized configuration
import { globalErrorHandler, NotFoundError } from "./utils/errorHandler";

// Import Routes
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import cartRoutes from "./routes/cartRoutes";
import rentalRoutes from "./routes/rentalRoutes";
// import orderRoutes from "./routes/orderRoutes"; // For future

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.corsAllowedOrigins.includes(origin) || config.nodeEnv === 'development') { // Allow all in dev for simplicity if needed
        callback(null, true);
      } else {
        console.warn(`CORS Blocked Request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Added PATCH and OPTIONS
    allowedHeaders: ["Content-Type", "Authorization", "X-Mock-User-ID"], // Added X-Mock-User-ID
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// API Routes
app.use("/api/categories", categoryRoutes); // Changed from /api/category
app.use("/api/items", itemRoutes);         // Changed from /api/item
app.use("/api/cart", cartRoutes);
app.use("/api/rentals", rentalRoutes);
// app.use("/api/orders", orderRoutes); // For future

// Handle 404 for undefined routes - this should be after all valid routes
app.all("*", (req, _res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handling Middleware - Must be the last piece of middleware
app.use(globalErrorHandler);

export default app;