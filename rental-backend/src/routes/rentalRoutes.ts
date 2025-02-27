import * as express from "express";
import { addRentalItem } from "../controllers/rentalController";

const router = express.Router();

router.post("/", addRentalItem); // Route to add a new rental

export default router;
