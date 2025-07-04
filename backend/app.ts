import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { setupDatabaseAndContainer } from "./db";
import userRoutes from "./routes/userRoutes";
import dynamicRoutes from "./routes/api";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes";
import productRoutes from "./routes/productRoutes";

// Import parttime service routes
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";

// Import rental service routes
import rentalRoutes from "./routes/rentalRoutes";
import cartRoutes from "./routes/cartRoutes";
import itemRoutes from "./routes/itemRoutes";
import orderRoutes from "./routes/orderRoutes";
import categoryRoutes from "./routes/categoryRoutes";

// Import food service routes
import foodRoutes from "./routes/foodRoutes";

dotenv.config();

const app: Application = express();
const port: number = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug Middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});

// Main routes
app.use("/user", userRoutes);
app.use("/api", (req, res, next) => {
    console.log(`API route accessed: ${req.method} ${req.path}`);
    next();
});
app.use("/api", dynamicRoutes);
app.use("/events", eventRoutes);
app.use("/products", productRoutes);

// Parttime service routes
app.use("/api/parttime/jobs", jobRoutes);
app.use("/api/parttime/applications", applicationRoutes);

// Rental service routes
app.use("/api/rental", rentalRoutes);
app.use("/api/rental/cart", cartRoutes);
app.use("/api/rental/items", itemRoutes);
app.use("/api/rental/orders", orderRoutes);
app.use("/api/rental/categories", categoryRoutes);

// Food service routes
app.use("/api/food", foodRoutes);
// Start Server
async function startServer(): Promise<void> {
    try {
        console.log("Initializing server...");
        await setupDatabaseAndContainer();
        app.listen(port, '0.0.0.0', () => {
            console.log(`Main backend server running at http://0.0.0.0:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();