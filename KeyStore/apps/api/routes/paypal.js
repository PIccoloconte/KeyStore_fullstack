import express from "express";
import { createPayPalPayment } from "../controllers/paypal.js";

const router = express.Router();

router.post("/", createPayPalPayment);

export default router;
