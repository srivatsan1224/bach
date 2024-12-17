"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
// Function to generate a unique ID using SHA-256 hash
function generateUniqueId(email) {
    return crypto_1.default.createHash("sha256").update(email).digest("hex");
}
// API to handle signup with an array of users
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, users, } = req.body; // Expect `users` as an array
    console.log("Request Body:", req.body);
    console.log("Users Array:", req.body.users);
    if (!containerName || !Array.isArray(users)) {
        res
            .status(400)
            .json({ message: "Container name and an array of users are required!" });
        return;
    }
    try {
        const container = yield (0, db_1.getContainer)(containerName);
        const results = [];
        for (const user of users) {
            const { username, password, name, age, gender, address, city, state, pincode, mobileNumber, email, } = user;
            if (!email) {
                results.push({ email, status: "failed", message: "Email is required!" });
                continue;
            }
            const userId = generateUniqueId(email); // Generate a unique ID
            try {
                const userItem = {
                    id: userId, // Unique ID
                    username,
                    password,
                    name,
                    age,
                    gender,
                    address: `${address}, ${city}, ${state}, ${pincode}`, // Combine address fields
                    mobileNumber,
                    email,
                    createdAt: new Date().toISOString(),
                };
                yield container.items.upsert(userItem); // Store user in DB
                results.push({ email, status: "success", userId });
            }
            catch (error) {
                results.push({ email, status: "failed", message: error.message });
            }
        }
        res.status(200).json({ results });
    }
    catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// API to retrieve a user by unique ID
router.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, userId } = req.query;
    if (!containerName || !userId) {
        res
            .status(400)
            .json({ message: "Container name and userId are required!" });
        return;
    }
    try {
        const container = yield (0, db_1.getContainer)(containerName);
        const { resources: users } = yield container.items
            .query({
            query: "SELECT * FROM c WHERE c.id = @id",
            parameters: [{ name: "@id", value: userId }],
        })
            .fetchAll();
        if (users.length === 0) {
            res.status(404).json({ message: "User not found!" });
            return;
        }
        res.status(200).json(users[0]);
    }
    catch (error) {
        console.error("Error retrieving user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
