const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// DB + Server Start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB Error:", err));