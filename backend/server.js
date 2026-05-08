const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
// const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*"
}));


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

// DB + Server Start
mongoose
  .connect(process.env.MONGO_URL )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("DB Error:", err));