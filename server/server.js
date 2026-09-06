const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;


/* =========================
   MIDDLEWARE
========================= */

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use(express.json());
app.use("/api/orders", orderRoutes);


/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "gandhi_ro_water",
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });


/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gandhi RO Water backend is running.",
  });
});


/* =========================
   TEST API
========================= */

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API connection successful.",
  });
});


/* =========================
   START SERVER
========================= */

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Gandhi RO Water backend running on port ${PORT}`
  );
});