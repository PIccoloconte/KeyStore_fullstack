import express from "express";
import gameRoutes from "./routes/games.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
//modificate le api /auth e /orders in /api/auth e /api/orders per la proxy all interno di next.config.js
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", authenticate, orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
