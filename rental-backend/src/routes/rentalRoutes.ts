import * as express from "express";
import { addRentalItem } from "../controllers/rentalController";
import { addRentalItemValidators, handleValidationErrors } from "../utils/validators";

const router = express.Router();

router.post(
    "/",
    addRentalItemValidators,
    handleValidationErrors,
    addRentalItem
);

export default router;